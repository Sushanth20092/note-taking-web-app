from pydantic import BaseModel

class NoteCreate(BaseModel):
    note_title: str
    note_content: str | None = ""

class NoteOut(NoteCreate):
    note_id: str
    user_id: str
    created_on: str
    last_update: str

    class Config:
        orm_mode = True
