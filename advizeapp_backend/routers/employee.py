from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Employee
from pydantic import BaseModel, EmailStr
from advizeapp_backend.utils.jwt import get_current_user
from advizeapp_backend.models import User

router = APIRouter(prefix="/api/v1/employees", tags=["employees"])

# Pydantic schema για validation
class EmployeeCreate(BaseModel):
    company_id: int
    name: str
    email: EmailStr
    role: str


@router.post("/", response_model=EmployeeCreate)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Δημιουργεί έναν νέο υπάλληλο.
    """
    existing_employee = db.query(Employee).filter(Employee.email == employee.email).first()
    if existing_employee:
        raise HTTPException(status_code=400, detail="Employee with this email already exists")
    
    new_employee = Employee(
        company_id=employee.company_id,
        name=employee.name,
        email=employee.email,
        role=employee.role
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


@router.get("/")
def list_employees(company_id: int, db: Session = Depends(get_db)):
    """
    Επιστρέφει όλους τους υπαλλήλους μιας εταιρείας.
    """
    employees = db.query(Employee).filter(Employee.company_id == company_id).all()
    return employees


@router.put("/{employee_id}", response_model=EmployeeCreate)
def update_employee(employee_id: int, employee: EmployeeCreate, db: Session = Depends(get_db)):
    """
    Ενημερώνει έναν υπάρχοντα υπάλληλο.
    """
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db_employee.name = employee.name
    db_employee.email = employee.email
    db_employee.role = employee.role
    db.commit()
    db.refresh(db_employee)
    return db_employee


@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    """
    Διαγράφει έναν υπάλληλο.
    """
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(db_employee)
    db.commit()
    return {"message": "Employee deleted successfully"}
