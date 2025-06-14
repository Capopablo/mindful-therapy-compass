from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer  # <-- Nueva importación
from sqlalchemy.orm import Session
from models import Therapist
from database import get_db
from typing import Optional

# Configuración de seguridad
SECRET_KEY = "tu_clave_secreta_superlarga_y_compleja"  # Cambia esto en producción!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Configuración OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")  # <-- Define el esquema

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --------------------------
# Funciones de seguridad
# --------------------------
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# --------------------------
# Funciones JWT
# --------------------------
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )

# --------------------------
# Autenticación
# --------------------------
def authenticate_user(db: Session, email: str, password: str):
    user = db.query(Therapist).filter(Therapist.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user

# --------------------------
# Administración de usuarios
# --------------------------
def create_admin_user(db: Session):
    admin_email = "admin@mindful.com"
    admin = db.query(Therapist).filter(Therapist.email == admin_email).first()
    
    if admin:
        return admin
        
    new_admin = Therapist(
        email=admin_email,
        password_hash=get_password_hash("Admin123"),
        full_name="Admin Principal",
        license_number="ADMIN-001",
        is_active=True
    )
    
    db.add(new_admin)
    db.commit()
    return new_admin

# --------------------------
# Dependencias FastAPI (actualizada)
# --------------------------
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(Therapist).filter(Therapist.email == email).first()
    if user is None:
        raise credentials_exception
    return user