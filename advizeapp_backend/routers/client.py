from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Client

# Δημιουργία router
router = APIRouter(prefix="/api/v1/clients", tags=["clients"])

# Pydantic model για validation
class ClientCreate(BaseModel):
    company_id: int
    name: str
    email: EmailStr
    vat_number: str
    phone: str

# Pydantic model για response
class ClientResponse(BaseModel):
    id: int
    company_id: int
    name: str
    email: EmailStr
    vat_number: str
    phone: str

    class Config:
        orm_mode = True

# Endpoint για επιστροφή όλων των πελατών
@router.get("/", response_model=List[ClientResponse])
def get_clients(
    company_id: Optional[int] = None,
    name: Optional[str] = None,
    email: Optional[str] = None,
    vat_number: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Επιστρέφει τους πελάτες με βάση τα φίλτρα.
    """
    query = db.query(Client)

    if company_id:
        query = query.filter(Client.company_id == company_id)
    if name:
        query = query.filter(Client.name.ilike(f"%{name}%"))
    if email:
        query = query.filter(Client.email.ilike(f"%{email}%"))
    if vat_number:
        query = query.filter(Client.vat_number.ilike(f"%{vat_number}%"))

    clients = query.all()

    if not clients:
        raise HTTPException(status_code=404, detail="No clients found matching the criteria.")
    return clients

# Endpoint για δημιουργία νέου πελάτη
@router.post("/", response_model=ClientResponse)
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    """
    Δημιουργεί έναν νέο πελάτη.
    """
    # Έλεγχος για διπλότυπα email ή VAT number
    existing_client = db.query(Client).filter(
        (Client.email == client.email) | (Client.vat_number == client.vat_number)
    ).first()
    if existing_client:
        raise HTTPException(
            status_code=400,
            detail="A client with the same email or VAT number already exists.",
        )
    
    new_client = Client(
        company_id=client.company_id,
        name=client.name,
        email=client.email,
        vat_number=client.vat_number,
        phone=client.phone,
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
        raise HTTPException(status_code=404, detail="Client not found.")

    db_client.company_id = client.company_id
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
        raise HTTPException(status_code=404, detail="Client not found.")

    db.delete(db_client)
    db.commit()
    return {"message": "Client deleted successfully"}
