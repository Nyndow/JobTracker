import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Path to the database
db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'database', 'jobtracker.db')
DATABASE_URL = f"sqlite:///{db_path}"

# Engine and session
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# FastAPI dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
