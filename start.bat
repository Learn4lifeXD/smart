@echo off
echo ==================================================
echo Starting Sovereign Tier (Backend + Frontend)
echo ==================================================

echo.
echo [1/3] Starting backend services using Docker Compose...
docker-compose up --build -d

echo.
echo [2/3] Installing frontend dependencies...
cd frontend
call npm install

echo.
echo [3/3] Starting frontend development server...
call npm run dev

pause
