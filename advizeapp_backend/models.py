from sqlalchemy import Column, Integer, String, ForeignKey, Float, Text, DateTime
from sqlalchemy.orm import relationship
from advizeapp_backend.database import Base  # Ενημέρωση διαδρομής
from datetime import datetime

class Company(Base):
    __tablename__ = "company"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    vat_number = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    employees = relationship("Employee", back_populates="company")
    clients = relationship("Client", back_populates="company")
    services = relationship("Service", back_populates="company")  # Προσθήκη σχέσης με υπηρεσίες


class Employee(Base):
    __tablename__ = "employee"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("company.id"))
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, nullable=False)
    permissions = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="employees")
    tasks = relationship("Task", back_populates="employee")


class Client(Base):
    __tablename__ = "client"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("company.id"))
    name = Column(String, nullable=False)
    vat_number = Column(String, unique=True)
    email = Column(String, unique=True)
    phone = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="clients")
    tasks = relationship("Task", back_populates="client")  # Προσθήκη σχέσης με tasks


class Task(Base):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("client.id"))
    employee_id = Column(Integer, ForeignKey("employee.id"))
    title = Column(String, nullable=False)
    description = Column(Text)
    deadline = Column(DateTime)
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="tasks")
    client = relationship("Client")


class Service(Base):
    __tablename__ = "service"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("company.id"))
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    company = relationship("Company", back_populates="services")  # Προσθήκη back_populates


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    company_id = Column(Integer, ForeignKey("company.id"))  # Προσθήκη σχέσης με εταιρεία

    company = relationship("Company")  # Σχέση με την εταιρεία
