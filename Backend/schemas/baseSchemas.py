from pydantic import BaseModel, Field
from typing import List, Optional

# ---------------- Company Schemas ----------------
class CompanyInformationSchema(BaseModel):
    infoType: str
    value: Optional[str] = None
    degree: int = Field(default=1, ge=1, le=3)
    titleCompInfo: Optional[str] = None

    class Config:
        orm_mode = True

class CompanySimpleSchema(BaseModel):
    idCompany: int
    name: str
    aboutCompany: Optional[str] = None

    class Config:
        orm_mode = True

class CompanyContactSchema(BaseModel):
    firstName: str
    lastName: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    position: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        orm_mode = True

class CompanySchema(BaseModel):
    name: str
    aboutCompany: Optional[str] = None
    companyInfos: Optional[List[CompanyInformationSchema]] = []
    contacts: Optional[List[CompanyContactSchema]] = []

    class Config:
        orm_mode = True

class CompanyResponseSchema(CompanySchema):
    idCompany: int

# ---------------- Job Schemas ----------------
class JobInformationSchema(BaseModel):
    infoType: str
    value: Optional[str] = None
    degree: int = Field(default=1, ge=1, le=3)
    titleJobInfo: Optional[str] = None

    class Config:
        orm_mode = True

class JobSchema(BaseModel):
    title: str
    jobInfos: Optional[List[JobInformationSchema]] = []

    class Config:
        orm_mode = True

class JobByCompany(BaseModel):
    idJob: int
    idCompany: int
    title: str

    class Config:
        orm_mode = True

class JobResponseSchema(JobSchema):
    idJob: int
    idCompany: int
