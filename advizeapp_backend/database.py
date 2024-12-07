from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Λήψη του DATABASE_URL από τα environment variables (Heroku)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("The DATABASE_URL environment variable is not set.")


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
