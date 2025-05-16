@echo off
REM Start both backend and frontend for development

echo Starting the development environment...

REM Start the backend server
start cmd /k "cd backend-c && make run"

REM Wait a moment for the backend to start
timeout /t 5

REM Start the frontend development server
start cmd /k "cd project && npm run dev"

echo Development environment started!
echo Backend running at http://localhost:5000
echo Frontend running at http://localhost:5173

REM Open the frontend in the default browser
start http://localhost:5173
