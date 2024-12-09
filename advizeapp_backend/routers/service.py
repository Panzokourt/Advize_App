from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Service

# Δημιουργία router
router = APIRouter(prefix="/api/v1/services", tags=["services"])

# Pydantic schema για validation και response
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

class ServiceCreate(BaseModel):
    company_id: int
    name: str = Field(..., example="Service Name")
    description: Optional[str] = Field(None, example="Description of the service")
    price: float = Field(..., example=99.99)

@router.get("/", response_model=List[ServiceResponse])
def list_services(
    company_id: int,
    name: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db),
):
    """
    Επιστρέφει όλες τις υπηρεσίες μιας συγκεκριμένης εταιρείας με δυνατότητα φιλτραρίσματος.
    """
    query = db.query(Service).filter(Service.company_id == company_id)
    if name:
        query = query.filter(Service.name.ilike(f"%{name}%"))
    if min_price:
        query = query.filter(Service.price >= min_price)
    if max_price:
        query = query.filter(Service.price <= max_price)
    
    services = query.all()
    if not services:
        raise HTTPException(status_code=404, detail="No services found for this company")
    return services

@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    """
    Δημιουργεί μια νέα υπηρεσία.
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

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, service: ServiceCreate, db: Session = Depends(get_db)):
    """
    Ενημερώνει μια υπάρχουσα υπηρεσία.
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
    Διαγράφει μια υπηρεσία.
    """
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db.delete(db_service)
    db.commit()
    return {"message": "Service deleted successfully"}
