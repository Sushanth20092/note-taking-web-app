from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.models import user, note
from app.routes import auth_routes
from app.routes import note_routes


Base.metadata.create_all(bind=engine)


app = FastAPI(title="Notes App API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],     
)

app.include_router(auth_routes.router, prefix="/api/v1")
app.include_router(note_routes.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "backend running"}
