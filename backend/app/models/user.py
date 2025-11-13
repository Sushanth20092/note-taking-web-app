import uuid
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.db.base import Base

def gen_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    user_id = Column(String(36), primary_key=True, default=gen_uuid)
    user_name = Column(String(128), nullable=False)
    user_email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    create_on = Column(DateTime, default=datetime.utcnow)
    last_update = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
