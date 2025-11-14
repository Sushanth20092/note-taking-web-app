from fastapi import APIRouter

router = APIRouter()

@router.get("/notes-test")
def notes_test():
    return {"message": "notes working"}
