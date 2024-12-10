from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Task, Service, Client
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])

# Summary των εργασιών ανά κατάσταση
@router.get("/tasks/status-summary/")
def task_status_summary(company_id: int, db: Session = Depends(get_db)):
    """
    Επιστρέφει το σύνολο των εργασιών ανά κατάσταση για μια εταιρεία.
    """
    statuses = db.query(
        Task.status, func.count(Task.id)
    ).join(Client).filter(
        Client.company_id == company_id
    ).group_by(Task.status).all()

    status_counts = {"Pending": 0, "Completed": 0, "In Progress": 0}
    for status, count in statuses:
        status_counts[status] = count

    return status_counts

# Summary υπηρεσιών
@router.get("/services/summary/")
def services_summary(company_id: int, db: Session = Depends(get_db)):
    """
    Επιστρέφει το σύνολο των υπηρεσιών και το συνολικό κόστος για μια εταιρεία.
    """
    total_services = db.query(func.count(Service.id)).filter(Service.company_id == company_id).scalar()
    total_cost = db.query(func.sum(Service.price)).filter(Service.company_id == company_id).scalar()

    return {
        "total_services": total_services,
        "total_cost": total_cost
    }

# Summary πελατών
@router.get("/clients/summary/")
def clients_summary(company_id: int, db: Session = Depends(get_db)):
    """
    Επιστρέφει το σύνολο των πελατών για μια εταιρεία.
    """
    total_clients = db.query(func.count(Client.id)).filter(Client.company_id == company_id).scalar()

    return {
        "total_clients": total_clients
    }

# Summary εργασιών ανά κατάσταση και χρονική περίοδο
@router.get("/tasks/status-summary-by-date/")
def task_status_summary_by_date(
    company_id: int,
    start_date: datetime,
    end_date: datetime,
    db: Session = Depends(get_db)
):
    """
    Επιστρέφει το σύνολο των εργασιών ανά κατάσταση για μια χρονική περίοδο.
    """
    statuses = db.query(
        Task.status, func.count(Task.id)
    ).join(Client).filter(
        and_(
            Client.company_id == company_id,
            Task.created_at >= start_date,
            Task.created_at <= end_date
        )
    ).group_by(Task.status).all()

    return {status: count for status, count in statuses}

# Πρόσφατες ολοκληρωμένες εργασίες
@router.get("/tasks/recent-completions/")
def recent_task_completions(company_id: int, days: int = 7, db: Session = Depends(get_db)):
    """
    Επιστρέφει τις εργασίες που ολοκληρώθηκαν τις τελευταίες 'days' ημέρες.
    """
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    completed_tasks = db.query(Task).join(Client).filter(
        and_(
            Client.company_id == company_id,
            Task.status == "Completed",
            Task.updated_at >= cutoff_date
        )
    ).all()

    return completed_tasks

# Σύνολο εσόδων από υπηρεσίες
@router.get("/services/revenue-summary/")
def service_revenue_summary(
    company_id: int,
    start_date: datetime,
    end_date: datetime,
    db: Session = Depends(get_db)
):
    """
    Επιστρέφει το συνολικό έσοδο από υπηρεσίες σε μια χρονική περίοδο.
    """
    total_revenue = db.query(func.sum(Service.price)).filter(
        and_(
            Service.company_id == company_id,
            Service.created_at >= start_date,
            Service.created_at <= end_date
        )
    ).scalar()

    return {
        "total_revenue": total_revenue
    }
