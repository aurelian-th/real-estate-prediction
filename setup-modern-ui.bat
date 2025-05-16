@echo off
REM Setup script for integrating the modern UI with our backend

echo Setting up the modern UI with backend integration...

REM Navigate to the project directory
cd project

REM Install dependencies
echo Installing dependencies...
call npm install --force

REM Make sure we have all the required packages
echo Installing specific dependencies...
call npm install --save axios@^1.6.7 react@^18.3.1 react-dom@^18.3.1 react-router-dom@^6.22.2 lucide-react@^0.344.0 recharts@^2.12.2
call npm install --save-dev @types/react@^18.2.61 @types/react-dom@^18.2.19 typescript@^5.3.3 vite@^5.1.4

REM Build the project
echo Building the project...
call npm run build

REM Create backend public folder if it doesn't exist
if not exist ..\backend-c\public mkdir ..\backend-c\public

REM Copy the built files to the backend's static folder
echo Copying built files to serve from backend...
xcopy /E /Y dist\* ..\backend-c\public\

echo Setup complete!
echo To run the application:
echo 1. Start your backend server
echo 2. Open a browser and go to http://localhost:5000/

pause
