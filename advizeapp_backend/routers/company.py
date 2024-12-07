from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Company, User
from pydantic import BaseModel
from advizeapp_backend.utils.jwt import get_current_user

router = APIRouter(prefix="/api/v1/companies", tags=["companies"])

# Pydantic schema for input validation
class CompanyCreate(BaseModel):
    name: str
    vat_number: str
    email: str
    phone: str

# Endpoint για δημιουργία νέας εταιρείας
@router.post("/", response_model=CompanyCreate)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    """
    Δημιουργεί μια νέα εταιρεία.
    """
    # Έλεγχος για διπλότυπα VAT ή email
    db_company = db.query(Company).filter(
        (Company.vat_number == company.vat_number) | 
        (Company.email == company.email)
    ).first()
    if db_company:
        raise HTTPException(status_code=400, detail="Company with this VAT or email already exists")

    new_company = Company(
        name=company.name,
        vat_number=company.vat_number,
        email=company.email,
        phone=company.phone
    )
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company

# Endpoint για λίστα όλων των εταιρειών
@router.get("/", response_model=list[CompanyCreate])
def list_companies(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Επιστρέφει όλες τις εταιρείες.
    """
    # Το current_user περιέχει τα δεδομένα του συνδεδεμένου χρήστη
    return db.query(Company).all()

# Endpoint για ενημέρωση εταιρείας
@router.put("/{company_id}", response_model=CompanyCreate)
def update_company(company_id: int, company: CompanyCreate, db: Session = Depends(get_db)):
    """
    Ενημερώνει μια εταιρεία.
    """
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    db_company.name = company.name
    db_company.vat_number = company.vat_number
    db_company.email = company.email
    db_company.phone = company.phone
    db.commit()
    db.refresh(db_company)
    return db_company

# Endpoint για διαγραφή εταιρείας
@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    """
    Διαγράφει μια εταιρεία.
    """
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    db.delete(db_company)
    db.commit()
    return {"message": "Company deleted successfully"}
