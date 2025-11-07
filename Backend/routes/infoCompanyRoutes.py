from fastapi import APIRouter, Depends,Form, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from sqlalchemy import desc
from pathlib import Path

from models.base import CompanyInformation
from schemas.baseSchemas import CompanyInformationSchema
from config.database import get_db
from utils.saveHtml import save_html_file, save_assets

router = APIRouter(
    prefix="/company-info",
    tags=["company-information"]
)

BASE_FOLDER = Path("static")  # base folder

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


@router.post("/html", response_model=CompanyInformationSchema)
def create_company_info_html(
    company_id: int = Form(...),
    infoType: str = Form(...),
    titleCompInfo: str = Form(...),
    degree: int = Form(...),
    value: str = Form(""),  # optional when uploading HTML
    file: UploadFile = File(None),  # main HTML file
    assets: Optional[List[UploadFile]] = File(None),  # asset files
    db: Session = Depends(get_db),
):
    try:
        if infoType.lower() == "html":
            if not file:
                raise HTTPException(status_code=400, detail="HTML file is required when infoType=html")

            original_name = Path(file.filename).stem
            company_dir = BASE_FOLDER / "html" / f"company_{company_id}"

            # Save HTML file in company folder
            filename = f"{company_id}_{original_name}.html"
            file_path = save_html_file(company_dir, filename, file.file.read())

            # Save asset files in a subfolder
            if assets:
                files_dir = company_dir / f"{original_name}_files"
                asset_dict = {asset.filename: asset.file.read() for asset in assets}
                save_assets(asset_dict, files_dir)

            value_to_store = file_path
        else:
            value_to_store = value

        # Save in database
        db_info = CompanyInformation(
            idCompany=company_id,
            infoType=infoType,
            value=value_to_store,
            degree=degree,
            titleCompInfo=titleCompInfo,
        )
        db.add(db_info)
        db.commit()
        db.refresh(db_info)
        return db_info

    except Exception as e:
        db.rollback()
        print("DB ERROR:", e)
        raise HTTPException(status_code=400, detail=str(e))

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
