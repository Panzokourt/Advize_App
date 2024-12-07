from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Φόρτωση .env
load_dotenv()

# Παίρνουμε το URL της βάσης από το .env
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Ρύθμιση σύνδεσης
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency για σύνδεση με τη βάση
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
