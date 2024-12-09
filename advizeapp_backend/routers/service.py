from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Service
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

router = APIRouter(prefix="/api/v1/services", tags=["services"])

# Pydantic schema για validation
class ServiceCreate(BaseModel):
    name: str
    description: Optional[str]
    price: float

class ServiceResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    new_service = Service(
        name=service.name,
        description=service.description,
        price=service.price,
    )
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service

@router.get("/", response_model=List[ServiceResponse])
def list_services(db: Session = Depends(get_db)):
    """
    Επιστροφή όλων των υπηρεσιών.
    """
    services = db.query(Service).all()
    return services

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, service: ServiceCreate, db: Session = Depends(get_db)):
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
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db.delete(db_service)
    db.commit()
    return {"message": "Service deleted successfully"}
