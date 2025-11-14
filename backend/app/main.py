from fastapi import FastAPI
from app.db.database import Base, engine
from app.models import user, note
from app.routes import auth_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notes App API")


app.include_router(auth_routes.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "backend running"}
