from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Therapist
from schemas import TherapistCreate, TherapistOut
from auth import get_password_hash  # Importamos la función de hashing
from datetime import datetime  # Para la fecha de creación

router = APIRouter(
    prefix="/therapists",  # Corregido: "therapists" en lugar de "therapists"
    tags=["therapists"]
)

# --- Endpoint 1: Registrar un psicólogo (CON HASH REAL) ---
@router.post("/", response_model=TherapistOut, status_code=status.HTTP_201_CREATED)
def create_therapist(therapist: TherapistCreate, db: Session = Depends(get_db)):
    # Verificar si el email ya está registrado
    existing_email = db.query(Therapist).filter(Therapist.email == therapist.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )
    
    # Verificar si el número de licencia ya existe
    existing_license = db.query(Therapist).filter(Therapist.license_number == therapist.license_number).first()
    if existing_license:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El número de licencia ya está registrado"
        )
    
    # Crear el psicólogo CON CONTRASEÑA HASHEADA
    db_therapist = Therapist(
        full_name=therapist.full_name,
        email=therapist.email,
        license_number=therapist.license_number,
        password_hash=get_password_hash(therapist.password),  # 👈 Hashing real
        created_at=datetime.utcnow(),  # 👈 Fecha de creación
        is_active=True  # 👈 Estado activo por defecto
    )
    
    db.add(db_therapist)
    db.commit()
    db.refresh(db_therapist)
    
    return db_therapist

# --- Endpoint 2: Obtener un psicólogo por ID ---
@router.get("/{therapist_id}", response_model=TherapistOut)
def get_therapist(therapist_id: int, db: Session = Depends(get_db)):
    therapist = db.query(Therapist).filter(Therapist.id == therapist_id).first()
    if not therapist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Psicólogo no encontrado"
        )
    return therapist

# --- Endpoint 3: Listar todos los psicólogos (NUEVO) ---
@router.get("/", response_model=list[TherapistOut])
def list_therapists(db: Session = Depends(get_db)):
    return db.query(Therapist).all()