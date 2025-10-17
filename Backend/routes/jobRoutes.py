from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.base import Job, JobInformation
from schemas.baseSchemas import JobSchema, JobResponseSchema
from config.database import get_db

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)

# Create a job
@router.post("/", response_model=JobResponseSchema)
def create_job(job: JobSchema, company_id: int, db: Session = Depends(get_db)):
    db_job = Job(
        idCompany=company_id,
        title=job.title
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)

    # Add job information
    for info in job.jobInfos:
        ji = JobInformation(
            idJob=db_job.idJob,
            infoType=info.infoType,
            value=info.value,
            degree=info.degree
        )
        db.add(ji)

    db.commit()
    db.refresh(db_job)
    return db_job

# Get all jobs for a company
@router.get("/company/{company_id}", response_model=List[JobResponseSchema])
def get_jobs(company_id: int, db: Session = Depends(get_db)):
    jobs = db.query(Job).filter(Job.idCompany == company_id).all()
    return jobs

# Get a single job
@router.get("/{job_id}", response_model=JobResponseSchema)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.idJob == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

# Delete a job
@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.idJob == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    return {"detail": "Job deleted"}
