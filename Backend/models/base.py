from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship, declarative_base
import json

Base = declarative_base()

# --------------------
# Company Table
# --------------------
class Company(Base):
    __tablename__ = "companies"

    idCompany = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    aboutCompany = Column(Text, nullable=True) 

    # Relationships
    jobs = relationship("Job", back_populates="company", cascade="all, delete-orphan")
    companyInfos = relationship("CompanyInformation", back_populates="company", cascade="all, delete-orphan")
    contacts = relationship("CompanyContact", back_populates="company", cascade="all, delete-orphan")


# --------------------
# Job Table
# --------------------
class Job(Base):
    __tablename__ = "jobs"

    idJob = Column(Integer, primary_key=True, index=True)
    idCompany = Column(Integer, ForeignKey("companies.idCompany"), nullable=False)
    title = Column(String(100), nullable=False)

    # Relationships
    company = relationship("Company", back_populates="jobs")
    jobInfos = relationship("JobInformation", back_populates="job", cascade="all, delete-orphan")


# --------------------
# Flexible Company Information Table
# --------------------
class CompanyInformation(Base):
    __tablename__ = "company_information"

    idCompanyInfo = Column(Integer, primary_key=True, index=True)
    idCompany = Column(Integer, ForeignKey("companies.idCompany"), nullable=False)

    infoType = Column(String(50), nullable=False)  # 'text', 'link', 'image', 'file', 'json'
    titleCompInfo = Column(String(100), nullable=True)
    value = Column(Text, nullable=True)            # text, URL, file path, or JSON string
    degree = Column(Integer, nullable=False, default=1)  # importance: 1 → 3

    # Relationship
    company = relationship("Company", back_populates="companyInfos")

    # JSON helpers
    def set_json_value(self, data: dict):
        self.value = json.dumps(data)

    def get_json_value(self):
        try:
            return json.loads(self.value)
        except Exception:
            return None


# --------------------
# Flexible Job Information Table
# --------------------
class JobInformation(Base):
    __tablename__ = "job_information"

    idJobInfo = Column(Integer, primary_key=True, index=True)
    idJob = Column(Integer, ForeignKey("jobs.idJob"), nullable=False)

    infoType = Column(String(50), nullable=False)  # 'text', 'link', 'image', 'file', 'json'
    titleJobInfo = Column(String(100), nullable=True)
    value = Column(Text, nullable=True)
    degree = Column(Integer, nullable=False, default=1)  # importance: 1 → 3

    # Relationship
    job = relationship("Job", back_populates="jobInfos")

    # JSON helpers
    def set_json_value(self, data: dict):
        self.value = json.dumps(data)

    def get_json_value(self):
        try:
            return json.loads(self.value)
        except Exception:
            return None


# --------------------
# Company Contact Table
# --------------------
class CompanyContact(Base):
    __tablename__ = "company_contacts"

    idContact = Column(Integer, primary_key=True, index=True)
    idCompany = Column(Integer, ForeignKey("companies.idCompany"), nullable=False)
    firstName = Column(String(50), nullable=False)
    lastName = Column(String(50), nullable=True)
    email = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    position = Column(String(50), nullable=True)
    notes = Column(Text, nullable=True)

    # Relationship
    company = relationship("Company", back_populates="contacts")
