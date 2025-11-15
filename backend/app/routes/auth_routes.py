from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.hashing import hash_password, verify_password
from app.auth.auth_handler import create_access_token
from app.auth.auth_bearer import JWTBearer

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
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


@router.post("/signin")    # ✅ FIXED
def signin(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.user_email == user.user_email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    payload = {"user_id": db_user.user_id, "user_email": db_user.user_email}
    access_token = create_access_token(payload)

    return {"access_token": access_token}


@router.get("/me", dependencies=[Depends(JWTBearer())])
def get_me(token_data: dict = Depends(JWTBearer())):
    return {
        "user_id": token_data["user_id"],
        "user_email": token_data["user_email"]
    }
