# Moldova Insight Realty - Frontend Diagnostic Script

Write-Host "==============================================" -ForegroundColor Blue
Write-Host "   Moldova Insight Realty - Frontend Diagnostics   " -ForegroundColor Blue
Write-Host "==============================================" -ForegroundColor Blue
Write-Host

# Check if Node.js is installed
Write-Host "[1/5] Checking Node.js installation..." -ForegroundColor Green
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js is not installed or not in PATH." -ForegroundColor Red
    Write-Host "    Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "[2/5] Checking npm installation..." -ForegroundColor Green
try {
    $npmVersion = npm --version
    Write-Host "  ✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ npm is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# Check if we're in the right directory
Write-Host "[3/5] Checking project structure..." -ForegroundColor Green
$projectDir = Join-Path $PSScriptRoot "project"
if (Test-Path $projectDir) {
    Write-Host "  ✓ Project directory found" -ForegroundColor Green
    
    # Check for package.json
    $packageJson = Join-Path $projectDir "package.json"
    if (Test-Path $packageJson) {
        Write-Host "  ✓ package.json found" -ForegroundColor Green
    } else {
        Write-Host "  ✗ package.json not found" -ForegroundColor Red
        exit 1
    }
    
    # Check for node_modules
    $nodeModules = Join-Path $projectDir "node_modules"
    if (Test-Path $nodeModules) {
        Write-Host "  ✓ node_modules found" -ForegroundColor Green
    } else {
        Write-Host "  ! node_modules not found. Installing dependencies..." -ForegroundColor Yellow
        Set-Location $projectDir
        npm install
    }
    
} else {
    Write-Host "  ✗ Project directory not found" -ForegroundColor Red
    exit 1
}

# Check network
Write-Host "[4/5] Checking network connectivity..." -ForegroundColor Green
try {
    $loopbackTest = Test-NetConnection -ComputerName localhost -InformationLevel Quiet
    if ($loopbackTest) {
        Write-Host "  ✓ Localhost is accessible" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Localhost is not accessible" -ForegroundColor Red
    }
    
    # Get IP addresses
    $ipAddresses = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" } | Select-Object IPAddress
    Write-Host "  Network IP addresses available:" -ForegroundColor Cyan
    foreach ($ip in $ipAddresses) {
        Write-Host "    - $($ip.IPAddress)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "  ! Could not check network connectivity" -ForegroundColor Yellow
}

# Kill any running node processes
Write-Host "[5/5] Preparing to run the application..." -ForegroundColor Green
Write-Host "  Stopping any running Node.js processes..." -ForegroundColor Yellow
try {
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Write-Host "  ✓ Stopped existing Node.js processes" -ForegroundColor Green
} catch {
    Write-Host "  ! No Node.js processes to stop" -ForegroundColor Yellow
}

# Summary
Write-Host
Write-Host "==============================================" -ForegroundColor Blue
Write-Host "               READY TO RUN                   " -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Blue
Write-Host
Write-Host "Please run one of the following commands:" -ForegroundColor Cyan
Write-Host
Write-Host "Option 1: Run in current window:" -ForegroundColor Magenta
Write-Host "  cd project && npm run dev -- --host 0.0.0.0 --port 5173" -ForegroundColor White
Write-Host
Write-Host "Option 2: Run the batch file:" -ForegroundColor Magenta
Write-Host "  .\run-frontend-direct.bat" -ForegroundColor White
Write-Host
Write-Host "After the server starts, try accessing the application at:" -ForegroundColor Yellow
Write-Host "  http://localhost:5173" -ForegroundColor White
Write-Host "  http://127.0.0.1:5173" -ForegroundColor White
Write-Host "  Or one of your network IP addresses + :5173" -ForegroundColor White
Write-Host

# Ask if user wants to run the app directly
$runApp = Read-Host "Do you want to run the application now? (y/n)"
if ($runApp -eq "y" -or $runApp -eq "Y") {
    Write-Host "Starting the frontend application..." -ForegroundColor Green
    Set-Location $projectDir
    npm run dev -- --host 0.0.0.0 --port 5173
} else {
    Write-Host "Exiting. Run the command manually when ready." -ForegroundColor Yellow
}
