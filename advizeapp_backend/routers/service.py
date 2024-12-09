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
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db),
):
    try:
        query = db.query(Service).filter(Service.company_id == company_id)

        if name:
            query = query.filter(Service.name.ilike(f"%{name}%"))
        if min_price is not None:
            query = query.filter(Service.price >= min_price)
        if max_price is not None:
            query = query.filter(Service.price <= max_price)

        services = query.all()
        return services
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# POST endpoint για δημιουργία υπηρεσίας
@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    try:
        new_service = Service(
            company_id=service.company_id,
            name=service.name,
            description=service.description,
            price=service.price,
        )
        db.add(new_service)
        db.commit()
        db.refresh(new_service)
        return new_service
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# DELETE endpoint για διαγραφή υπηρεσίας
@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(db_service)
    db.commit()
    return {"message": "Service deleted successfully"}
