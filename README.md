A fully-responsive, secure Notes Application built using Next.js, Tailwind CSS, FastAPI, MySQL, and Docker, as required by the assignment specification.

This project includes authentication, CRUD operations, protected routes, JWT-based secure login, Dockerized backend & frontend, and a clean UI.

🚀 Tech Stack
Frontend

Next.js

Tailwind CSS

Axios

Zustand (state management)

React Query

Framer Motion (UI animations)

Backend

FastAPI

MySQL

SQLAlchemy ORM

Pydantic

JWT Auth (HS256)

DevOps

Docker

Docker Compose

⭐ Features
🔐 Authentication

Signup & Login using JWT

Protected routes (Notes only load after valid login)

Token persistence via Zustand

📝 Notes Management

Create Notes

View Notes

Edit Notes

Delete Notes

Auto-refresh after updates

Editor-style modal for note editing

💾 Database

MySQL container

Auto table creation via SQLAlchemy models

Persistent volumes

🐳 Docker Support

Fully dockerized frontend, backend, and database

One command to run the entire project

Create .env inside backend folder:

SECRET_KEY="yousecretkey"
DATABASE_URL=mysql+pymysql://notesuser:notespass@db:3306/notesdb
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

docker-compose down --volumes
docker-compose up --build

Run Locally Without Docker
Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Frontend
cd frontend
npm install
npm run dev
