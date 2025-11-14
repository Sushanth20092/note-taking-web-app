import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from datetime import datetime
from app.db.database import Base

def gen_uuid():
    return str(uuid.uuid4())

class Note(Base):
    __tablename__ = "notes"
    note_id = Column(String(36), primary_key=True, default=gen_uuid)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    note_title = Column(String(255), nullable=False)
    note_content = Column(String(4000), nullable=True)
    created_on = Column(DateTime, default=datetime.utcnow)
    last_update = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
