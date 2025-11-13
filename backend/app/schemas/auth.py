from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    user_name: str
    user_email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: str | None = None
