@echo off
REM Moldova Insight Realty - Deployment Script for Windows

echo ====== Moldova Insight Realty Deployment ======
echo Date: %date% %time%
echo ================================================

REM GitHub Deployment (if needed)
IF "%1"=="--github" (
  echo Preparing for GitHub deployment...
  
  REM Copy GitHub-specific README
  copy README-GITHUB.md README.md
  
  REM Add files to git
  git add .
  
  REM Commit changes
  git commit -m "Deployment update: %date%"
  
  REM Push to GitHub
  git push origin main
  
  echo GitHub deployment completed.
  exit /b 0
)

REM Frontend Build
echo Building frontend...
cd frontend-react
call npm install
call npm run build
echo Frontend build completed.

echo.
echo In a full implementation, this script would:
echo ----------------------------------------
echo 1. Compile the C backend:
echo    cd backend-c ^&^& mingw32-make clean ^&^& mingw32-make
echo.
echo 2. Set up the PostgreSQL database:
echo    - Use the pgAdmin interface to create a database
echo    - Run the SQL files in backend-c\sql through pgAdmin
echo.
echo 3. Deploy to a production server:
echo    - Copy frontend build files to web server directory
echo    - Copy backend executable to server
echo    - Configure environment variables
echo    - Restart services
echo.
echo 4. For GitHub deployment:
echo    - Run this script with --github flag to push to GitHub
echo    - Example: deploy.bat --github
echo.
echo For the visual MVP, simply serve the frontend build:
echo cd frontend-react ^&^& npx serve -s dist -p 3000
echo.
echo ================================================

cd ..
