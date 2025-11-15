from pydantic import BaseModel
from datetime import datetime

class NoteBase(BaseModel):
    note_title: str
    note_content: str | None = None

class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class NoteResponse(NoteBase):
    note_id: str
    user_id: str
    created_on: datetime
    last_update: datetime

    class Config:
        orm_mode = True
