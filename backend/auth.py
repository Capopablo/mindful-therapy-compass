from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status

# Configuración de seguridad (¡cambia esto en producción!)
SECRET_KEY = "tu_clave_secreta_superlarga_y_compleja"  # Min 32 caracteres
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Tiempo de vida del token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Funciones existentes (se mantienen) ---
def get_password_hash(password: str) -> str:
    """Genera un hash seguro de la contraseña"""
    return pwd_context.hash(password)

# --- Nuevas funciones para JWT ---
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica si la contraseña coincide con el hash almacenado"""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    """Genera un token JWT con los datos proporcionados"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    """Decodifica y verifica un token JWT"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )


