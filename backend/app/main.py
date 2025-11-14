from fastapi import FastAPI
from app.api.v1 import auth, notes


from app.db.database import Base, engine
from app.models import user, note


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notes App API")


app.include_router(auth.router, prefix="/api/v1")
app.include_router(notes.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "backend running"}
