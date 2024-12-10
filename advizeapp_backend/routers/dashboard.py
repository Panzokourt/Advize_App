from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Task, Service, Client

router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])

# Συνολικός αριθμός πελατών
@router.get("/clients/summary/")
def clients_summary(db: Session = Depends(get_db)):
    """
    Επιστρέφει το σύνολο των πελατών.
    """
    total_clients = db.query(func.count(Client.id)).scalar()
    return {"total_clients": total_clients}

# Συνολικός αριθμός εργασιών ανά κατάσταση
@router.get("/tasks/status-summary/")
def tasks_status_summary(db: Session = Depends(get_db)):
    """
    Επιστρέφει το σύνολο των εργασιών ανά κατάσταση.
    """
    statuses = db.query(Task.status, func.count(Task.id)).group_by(Task.status).all()
    return {status: count for status, count in statuses}

# Συνολικός αριθμός υπηρεσιών και κόστος
@router.get("/services/summary/")
def services_summary(db: Session = Depends(get_db)):
    """
    Επιστρέφει το σύνολο των υπηρεσιών και το συνολικό κόστος.
    """
    total_services = db.query(func.count(Service.id)).scalar()
    total_cost = db.query(func.sum(Service.price)).scalar()
    return {"total_services": total_services, "total_cost": total_cost or 0}
