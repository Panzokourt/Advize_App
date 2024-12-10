from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Service
from pydantic import BaseModel, Field


router = APIRouter(prefix="/api/v1/services", tags=["services"])


# Pydantic schema για validation
class ServiceCreate(BaseModel):
    company_id: int
    name: str = Field(..., example="Service Name")
    description: Optional[str] = Field(None, example="Description of the service")
    price: float = Field(..., example=99.99)

class ServiceResponse(BaseModel):
    id: int
    company_id: int
    name: str
    description: Optional[str]
    price: float
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# GET endpoint με φίλτρα
@router.get("/", response_model=List[ServiceResponse])
def list_services(
    company_id: int,
    name: Optional[str] = None,
    price: Optional[float] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Service).filter(Service.company_id == company_id)

    if name:
        query = query.filter(Service.name.ilike(f"%{name}%"))
    if price is not None:
        query = query.filter(Service.price == price)

    services = query.all()
    return services

# POST endpoint για δημιουργία υπηρεσίας
@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    try:
        new_service = Service(
            company_id=service.company_id,
            name=service.name,
            description=service.description,
            price=service.price,
            created_at=datetime.utcnow(),  # Explicitly set datetime
            updated_at=datetime.utcnow(),  # Explicitly set datetime
        )

        db.add(new_service)
        db.commit()
        db.refresh(new_service)
        return new_service
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# PUT endpoint για ενημέρωση υπηρεσίας
@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, service: ServiceCreate, db: Session = Depends(get_db)):
    try:
        db_service = db.query(Service).filter(Service.id == service_id).first()
        if not db_service:
            raise HTTPException(status_code=404, detail="Service not found")

        db_service.name = service.name
        db_service.description = service.description
        db_service.price = service.price
        db.commit()
        db.refresh(db_service)
        return db_service
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# DELETE endpoint για διαγραφή υπηρεσίας
@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    try:
        db_service = db.query(Service).filter(Service.id == service_id).first()
        if not db_service:
            raise HTTPException(status_code=404, detail="Service not found")
        db.delete(db_service)
        db.commit()
        return {"message": "Service deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

