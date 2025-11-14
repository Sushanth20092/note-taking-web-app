# backend/app/routes/auth_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin, TokenResponse
from app.utils.hashing import hash_password, verify_password
from app.auth.auth_handler import create_access_token
from app.auth.auth_bearer import JWTBearer

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    # check existing email
    existing = db.query(User).filter(User.user_email == payload.user_email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        user_name=payload.user_name,
        user_email=payload.user_email,
        password=hash_password(payload.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User created", "user_id": user.user_id}

@router.post("/signin", response_model=TokenResponse)
def signin(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_email == payload.user_email).first()
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"user_id": user.user_id, "user_email": user.user_email})
    return {"access_token": token, "token_type": "bearer"}
    
@router.get("/me", dependencies=[Depends(JWTBearer())])
def get_me(token_data: dict = Depends(JWTBearer())):
    return {
        "user_id": token_data["user_id"],
        "user_email": token_data["user_email"]
    }