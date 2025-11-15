from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.note import Note
from app.schemas.note_schema import NoteCreate, NoteUpdate, NoteResponse
from app.auth.auth_bearer import JWTBearer

router = APIRouter(prefix="/notes", tags=["notes"])

def get_current_user(payload: dict = Depends(JWTBearer())):
    print("🔍 DECODED PAYLOAD:", payload)
    return payload["user_id"]


@router.post("/", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def create_note(
    payload: NoteCreate,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_note = Note(
        user_id=user_id,
        note_title=payload.note_title,
        note_content=payload.note_content
    )
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note


@router.get("/", response_model=list[NoteResponse])
def get_notes(
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notes = db.query(Note).filter(Note.user_id == user_id).all()
    return notes


@router.get("/{note_id}", response_model=NoteResponse)
def get_single_note(
    note_id: str,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    note = db.query(Note).filter(Note.note_id == note_id, Note.user_id == user_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@router.put("/{note_id}", response_model=NoteResponse)
def update_note(
    note_id: str,
    payload: NoteUpdate,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    note = db.query(Note).filter(Note.note_id == note_id, Note.user_id == user_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    note.note_title = payload.note_title
    note.note_content = payload.note_content

    db.commit()
    db.refresh(note)
    return note


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(
    note_id: str,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    note = db.query(Note).filter(Note.note_id == note_id, Note.user_id == user_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return
