from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Service

router = APIRouter(prefix="/api/v1/services", tags=["services"])

# Pydantic schema for validation and response
class ServiceResponse(BaseModel):
    id: int
    company_id: int
    name: str
    description: Optional[str]
    price: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ServiceCreate(BaseModel):
    company_id: int
    name: str = Field(..., example="Service Name")
    description: Optional[str] = Field(None, example="Description of the service")
    price: float = Field(..., example=99.99)

@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    """
    Δημιουργία νέας υπηρεσίας
    """
    new_service = Service(
        company_id=service.company_id,
        name=service.name,
        description=service.description,
        price=service.price
    )
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service

@router.get("/", response_model=List[ServiceResponse])
def list_services(company_id: Optional[int] = None, db: Session = Depends(get_db)):
    """
    Επιστροφή όλων των υπηρεσιών.
    Αν το company_id δοθεί, επιστρέφει τις υπηρεσίες για την εταιρεία.
    """
    query = db.query(Service)
    if company_id:
        query = query.filter(Service.company_id == company_id)
    return query.all()

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, service: ServiceCreate, db: Session = Depends(get_db)):
    """
    Ενημέρωση υπάρχουσας υπηρεσίας
    """
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db_service.name = service.name
    db_service.description = service.description
    db_service.price = service.price
    db.commit()
    db.refresh(db_service)
    return db_service

@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    """
    Διαγραφή υπηρεσίας
    """
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db.delete(db_service)
    db.commit()
    return {"message": "Service deleted successfully"}

