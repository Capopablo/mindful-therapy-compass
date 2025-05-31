from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, date
from typing import Optional
from enum import Enum

# --- Enums para opciones predefinidas ---
class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class FileType(str, Enum):
    PDF = "pdf"
    IMAGE = "image"
    AUDIO = "audio"

# --- Psicólogos ---
class TherapistCreate(BaseModel):
    full_name: str = Field(max_length=100)
    email: EmailStr
    license_number: str = Field(max_length=50)
    password: str = Field(min_length=8, max_length=100)

class TherapistOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    license_number: str
    is_active: bool

    class Config:
        from_attributes = True  # Equivalente a orm_mode en Pydantic v2

# --- Pacientes ---
class PatientCreate(BaseModel):
    full_name: str = Field(max_length=100)
    therapist_id: int
    birth_date: Optional[date] = None
    gender: Optional[Gender]