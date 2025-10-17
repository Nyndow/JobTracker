from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.base import CompanyContact
from schemas.baseSchemas import CompanyContactSchema
from config.database import get_db

router = APIRouter(
    prefix="/company-contacts",
    tags=["company-contacts"]
)

# Create contact
@router.post("/", response_model=CompanyContactSchema)
def create_contact(contact: CompanyContactSchema, company_id: int, db: Session = Depends(get_db)):
    db_contact = CompanyContact(
        idCompany=company_id,
        firstName=contact.firstName,
        lastName=contact.lastName,
        email=contact.email,
        phone=contact.phone,
        position=contact.position,
        notes=contact.notes
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

# Get all contacts for a company
@router.get("/{company_id}", response_model=List[CompanyContactSchema])
def get_contacts(company_id: int, db: Session = Depends(get_db)):
    contacts = db.query(CompanyContact).filter(CompanyContact.idCompany == company_id).all()
    return contacts

# Delete contact
@router.delete("/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = db.query(CompanyContact).filter(CompanyContact.idContact == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    db.delete(contact)
    db.commit()
    return {"detail": "Contact deleted"}
