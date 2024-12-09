from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Client
from typing import List

# Δημιουργία router
router = APIRouter()

# Pydantic model για validation
class ClientCreate(BaseModel):
    name: str
    email: EmailStr
    vat_number: str
    phone: str

# Pydantic model για response
class ClientResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    vat_number: str
    phone: str

    class Config:
        orm_mode = True

# Endpoint για επιστροφή όλων των πελατών
@router.get("/", response_model=List[ClientResponse])
def get_clients(company_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Επιστρέφει τους πελάτες για μια συγκεκριμένη εταιρεία.
    """
    clients = db.query(Client).filter(Client.company_id == company_id).offset(skip).limit(limit).all()
    if not clients:
        raise HTTPException(status_code=404, detail="No clients found for this company")
    return clients


# Endpoint για δημιουργία νέου πελάτη
@router.post("/", response_model=ClientResponse)
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    """
    Δημιουργεί έναν νέο πελάτη.
    """
    existing_client = db.query(Client).filter(Client.email == client.email).first()
    if existing_client:
        raise HTTPException(status_code=400, detail="Client with this email already exists")
    
    new_client = Client(
        name=client.name,
        email=client.email,
        vat_number=client.vat_number,
        phone=client.phone
    )
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client

# Endpoint για ενημέρωση υπάρχοντος πελάτη
@router.put("/{client_id}", response_model=ClientResponse)
def update_client(client_id: int, client: ClientCreate, db: Session = Depends(get_db)):
    """
    Ενημερώνει έναν υπάρχοντα πελάτη.
    """
    db_client = db.query(Client).filter(Client.id == client_id).first()
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")

    db_client.name = client.name
    db_client.email = client.email
    db_client.vat_number = client.vat_number
    db_client.phone = client.phone
    db.commit()
    db.refresh(db_client)
    return db_client

# Endpoint για διαγραφή πελάτη
@router.delete("/{client_id}")
def delete_client(client_id: int, db: Session = Depends(get_db)):
    """
    Διαγράφει έναν πελάτη.
    """
    db_client = db.query(Client).filter(Client.id == client_id).first()
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")

    db.delete(db_client)
    db.commit()
    return {"message": "Client deleted successfully"}
