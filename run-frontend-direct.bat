@echo off
echo ===================================================
echo    Moldova Insight Realty - Modern UI Launcher
echo ===================================================

echo [1/4] Stopping any running Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo [2/4] Starting development server with specific configuration...
cd project

echo [3/4] Running development server...
echo Starting Vite development server in foreground...
echo.
echo When the server starts, you'll see URLs to access the application.
echo.
echo IMPORTANT: Try the following URLs in your browser:
echo - http://localhost:5173
echo - http://127.0.0.1:5173

call npm run dev -- --host 0.0.0.0 --port 5173 --strictPort false

echo [4/4] Server stopped. Press any key to exit...
pause
