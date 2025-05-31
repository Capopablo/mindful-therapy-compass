from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from routers.therapists import router as therapists_router
from models import Therapist
from auth import get_password_hash
from schemas import TherapistCreate  # Importación corregida desde schemas.py

# Crea las tablas en la base de datos (solo para desarrollo)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router organizado
app.include_router(therapists_router)

# --- Endpoints temporales (actualizados para coincidir con schemas.py) ---
@app.post("/therapists-old/")
def create_therapist_old(
    therapist: TherapistCreate,
    db: Session = Depends(get_db)
):
    hashed_password = get_password_hash(therapist.password)
    db_therapist = Therapist(
        full_name=therapist.full_name,
        email=therapist.email,
        license_number=therapist.license_number,  # Campo añadido para coincidir con el esquema
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