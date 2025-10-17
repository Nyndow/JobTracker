from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.base import JobInformation
from schemas.baseSchemas import JobInformationSchema
from config.database import get_db

router = APIRouter(
    prefix="/job-info",
    tags=["job-information"]
)

# Create job information
@router.post("/", response_model=JobInformationSchema)
def create_job_info(info: JobInformationSchema, job_id: int, db: Session = Depends(get_db)):
    db_info = JobInformation(
        idJob=job_id,
        infoType=info.infoType,
        value=info.value,
        degree=info.degree,
        titleJobInfo=info.titleJobInfo
    )
    db.add(db_info)
    db.commit()
    db.refresh(db_info)
    return db_info

# Get all info for a job
@router.get("/{job_id}", response_model=List[JobInformationSchema])
def get_job_info(job_id: int, db: Session = Depends(get_db)):
    infos = db.query(JobInformation).filter(JobInformation.idJob == job_id).all()
    return infos

# Delete job info
@router.delete("/{info_id}")
def delete_job_info(info_id: int, db: Session = Depends(get_db)):
    info = db.query(JobInformation).filter(JobInformation.idJobInfo == info_id).first()
    if not info:
        raise HTTPException(status_code=404, detail="Job information not found")
    db.delete(info)
    db.commit()
    return {"detail": "Job information deleted"}
