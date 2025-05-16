# Run the project frontend

# Set the working directory to the project folder
Set-Location -Path "$PSScriptRoot\project"

# Check if node_modules exists, if not install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}

# Start the development server
Write-Host "Starting development server..."
npm run dev

# Keep the window open
Read-Host -Prompt "Press Enter to close this window"
