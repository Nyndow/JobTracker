from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.base import Company
from schemas.baseSchemas import CompanySchema, CompanyResponseSchema, CompanySimpleSchema, JobByCompany
from config.database import get_db

router = APIRouter(
    prefix="/companies",
    tags=["companies"]
)

# Create a company
@router.post("/", response_model=CompanyResponseSchema)
def create_company(company: CompanySchema, db: Session = Depends(get_db)):
    db_company = Company(name=company.name, aboutCompany=company.aboutCompany)
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

# # Get all companies
# @router.get("/", response_model=List[CompanyResponseSchema])
# def get_companies(db: Session = Depends(get_db)):
#     return db.query(Company).all()

@router.get("/", response_model=List[CompanySimpleSchema])
def get_companies_simple(db: Session = Depends(get_db)):
    return db.query(Company).all()

# Get a single company
@router.get("/{company_id}", response_model=CompanyResponseSchema)
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.idCompany == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

# Get jobs by company
@router.get("/{company_id}/jobs", response_model=List[JobByCompany])
def get_jobs_by_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.idCompany == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    return company.jobs

# Delete a company
@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.idCompany == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    db.delete(company)
    db.commit()
    return {"detail": "Company deleted"}
