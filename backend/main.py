from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from routers.therapists import router as therapists_router
from models import Therapist, Patient, Session  # Importamos los modelos necesarios
from auth import get_password_hash
from schemas import TherapistCreate
from datetime import datetime  # Para manejar fechas

# Crea las tablas en la base de datos (solo para desarrollo)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuración CORS (se mantiene igual)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router organizado (se mantiene igual)
app.include_router(therapists_router)

# --- Endpoint nuevo para sesiones ---
@app.post("/patients/{patient_id}/sessions")
def create_session(
    patient_id: int,
    session_notes: str,  # Campo obligatorio
    session_date: datetime = None,  # Opcional (si no se envía, usará datetime.now())
    db: Session = Depends(get_db)
):
    # Verifica si el paciente existe
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        return {"error": "Paciente no encontrado"}, 404

    # Crea la sesión (usa la fecha actual si no se proporciona)
    new_session = Session(
        patient_id=patient_id,
        session_notes=session_notes,
        session_date=session_date if session_date else datetime.now(),
        # clinical_record_id puede añadirse después si es necesario
    )

    db.add(new_session)
    db.commit()
    
    return {
        "message": "Sesión registrada exitosamente",
        "session_id": new_session.id
    }

# --- Los endpoints existentes se mantienen intactos ---
@app.post("/therapists-old/")
def create_therapist_old(therapist: TherapistCreate, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(therapist.password)
    db_therapist = Therapist(
        full_name=therapist.full_name,
        email=therapist.email,
        license_number=therapist.license_number,
        password_hash=hashed_password
    )
    db.add(db_therapist)
    db.commit()
    return {"message": "Terapeuta registrado exitosamente"}

@app.get("/therapists-old/")
def list_therapists_old(db: Session = Depends(get_db)):
    return db.query(Therapist).all()

@app.get("/")
def home():
    return {"message": "API de Psicólogos Online"}