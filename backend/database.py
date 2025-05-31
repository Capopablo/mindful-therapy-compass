from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Conexión a Neon.tech (usa tus credenciales)
DATABASE_URL = "postgresql://neondb_owner:npg_5YMu3DVOERrZ@ep-crimson-meadow-a5et8y5w-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()