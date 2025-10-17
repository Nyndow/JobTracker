from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import desc

from models.base import CompanyInformation
from schemas.baseSchemas import CompanyInformationSchema
from config.database import get_db

router = APIRouter(
    prefix="/company-info",
    tags=["company-information"]
)

# Create company information
@router.post("/", response_model=CompanyInformationSchema)
def create_company_info(info: CompanyInformationSchema, company_id: int, db: Session = Depends(get_db)):
    db_info = CompanyInformation(
        idCompany=company_id,
        infoType=info.infoType,
        value=info.value,
        degree=info.degree,
        titleCompInfo=info.titleCompInfo
    )
    db.add(db_info)
    db.commit()
    db.refresh(db_info)
    return db_info

@router.get("/{company_id}", response_model=List[CompanyInformationSchema])
def get_company_info(company_id: int, db: Session = Depends(get_db)):
    infos = (
        db.query(CompanyInformation)
        .filter(CompanyInformation.idCompany == company_id)
        .order_by(desc(CompanyInformation.degree)) 
        .all()
    )
    return infos


# Delete company info
@router.delete("/{info_id}")
def delete_company_info(info_id: int, db: Session = Depends(get_db)):
    info = db.query(CompanyInformation).filter(CompanyInformation.idCompanyInfo == info_id).first()
    if not info:
        raise HTTPException(status_code=404, detail="Company info not found")
    db.delete(info)
    db.commit()
    return {"detail": "Company information deleted"}
