from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Smart Dossier - Dossier Service", version="1.0.0")

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "dossier-service"}

@app.get("/api/v1/dossiers")
def get_dossiers():
    return {"data": [], "message": "List of active dossiers"}

# TODO: Add more routes and connect to PostgreSQL
