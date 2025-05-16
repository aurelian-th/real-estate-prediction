@echo off
REM Setup script to install dependencies for the new project and start it

echo Ensuring required dependencies are installed...

cd project

echo Installing project dependencies...
call npm install
call npm install @types/react @types/react-dom react-router-dom lucide-react axios

echo Creating API service file to connect to the backend...

REM Create services directory if it doesn't exist
if not exist src\services mkdir src\services

echo Building project...
call npm run build

echo.
echo Setup complete! You can now start the development server with:
echo cd project
echo npm run dev
