from fastapi import FastAPI
from advizeapp_backend.database import Base, engine  # Βεβαιώσου για το σωστό path
from advizeapp_backend.routers import company, employee, client, task, service, auth, dashboard
from fastapi.middleware.cors import CORSMiddleware
import logging
import advizeapp_backend.models as models  # Ενημέρωση για το σωστό path

# Δημιουργία πινάκων
Base.metadata.create_all(bind=engine)

# Ρύθμιση logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Εισαγωγή του CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://advizeapp.com"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Επιτρέπει όλα τα HTTP methods
    allow_headers=["*"],  # Επιτρέπει όλα τα headers
)

# Εισαγωγή routers
try:
    app.include_router(company.router)
    logger.info("Company router loaded successfully")
    app.include_router(employee.router)
    logger.info("Employee router loaded successfully")
    app.include_router(client.router)
    logger.info("Client router loaded successfully")
    app.include_router(task.router, prefix="/api/v1")
    logger.info("Task router loaded successfully")
    app.include_router(service.router)
    logger.info("Service router loaded successfully")
    app.include_router(auth.router)
    logger.info("Auth router loaded successfully")
    app.include_router(dashboard.router, prefix="/api/v1")
    logger.info("Dashboard router loaded successfully")
except Exception as e:
    logger.error(f"Error loading routers: {e}")

@app.get("/")
def root():
    return {"message": "API is running"}
