@echo off
echo Running Moldova Insight Realty application diagnostics and launcher...

:: Run the PowerShell diagnostics script
powershell -ExecutionPolicy Bypass -File "%~dp0frontend-diagnostics.ps1"
