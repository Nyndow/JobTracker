from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from models.base import Base
from config.database import engine
from config.cors import setup_cors
from routes import (
    companyRoutes,
    infoCompanyRoutes,
    contactCompany,
    jobRoutes,
    infoJobRoutes
)

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI()
setup_cors(app)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(companyRoutes.router)
app.include_router(infoCompanyRoutes.router)
app.include_router(contactCompany.router)
app.include_router(jobRoutes.router)
app.include_router(infoJobRoutes.router)
