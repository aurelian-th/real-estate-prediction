@echo off
REM Moldova Insight Realty - Presentation Helper Script

echo Moldova Insight Realty - MVP Presentation Helper
echo ==============================================
echo.

:MENU
echo Please select an option:
echo 1. Start Frontend Development Server
echo 2. Generate Presentation PDF
echo 3. Run Demo Flow
echo 4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto START_FRONTEND
if "%choice%"=="2" goto GENERATE_PDF
if "%choice%"=="3" goto RUN_DEMO
if "%choice%"=="4" goto EXIT
goto INVALID_CHOICE

:START_FRONTEND
echo.
echo Starting Frontend Development Server...
echo.
cd frontend-react && npm run dev
goto EXIT

:GENERATE_PDF
echo.
echo Generating Presentation PDF...
echo.
powershell -ExecutionPolicy Bypass -File generate-presentation.ps1
echo.
pause
goto MENU

:RUN_DEMO
echo.
echo Running Demo Flow...
echo.
echo 1. Starting Frontend Development Server
cd frontend-react && start npm run dev

echo 2. Opening Demo Script
start notepad demo-script.md

echo 3. Waiting for 5 seconds...
timeout /t 5 /nobreak >nul

echo 4. Opening browser to application
start http://localhost:3000

echo.
echo Demo Flow Started!
echo.
pause
goto MENU

:INVALID_CHOICE
echo.
echo Invalid choice. Please try again.
echo.
goto MENU

:EXIT
echo.
echo Thank you for using the Moldova Insight Realty Presentation Helper.
echo.
