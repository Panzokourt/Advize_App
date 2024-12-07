from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from advizeapp_backend.database import get_db
from advizeapp_backend.models import Task
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

router = APIRouter()

# Pydantic schema για validation
class TaskCreate(BaseModel):
    client_id: int
    employee_id: int
    title: str
    description: str
    deadline: datetime
    status: str

@router.post("/tasks/")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(
        client_id=task.client_id,
        employee_id=task.employee_id,
        title=task.title,
        description=task.description,
        deadline=task.deadline,
        status=task.status
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.get("/tasks/")
def list_tasks(
    client_id: Optional[int] = None,
    employee_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Task)
    
    if client_id:
        query = query.filter(Task.client_id == client_id)
    if employee_id:
        query = query.filter(Task.employee_id == employee_id)
    if status:
        query = query.filter(Task.status == status)
    
    return query.all()


@router.put("/tasks/{task_id}")
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.client_id = task.client_id
    db_task.employee_id = task.employee_id
    db_task.title = task.title
    db_task.description = task.description
    db_task.deadline = task.deadline
    db_task.status = task.status
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}
