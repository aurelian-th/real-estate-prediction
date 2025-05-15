# PowerShell script to convert Markdown presentation to PDF

# Set script parameters
$markdownFile = "presentation.md"
$outputPdf = "Moldova Insight Realty - Presentation.pdf"
$cssFile = "presentation.css"

# Print welcome message
Write-Host "Moldova Insight Realty - Presentation Generator" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "npm version $npmVersion detected" -ForegroundColor Green
} catch {
    Write-Host "Error: npm is not installed. Please install Node.js and npm first." -ForegroundColor Red
    exit 1
}

# Check if the markdown file exists
if (-not (Test-Path $markdownFile)) {
    Write-Host "Error: $markdownFile not found in the current directory." -ForegroundColor Red
    exit 1
}

# Check if the CSS file exists
if (-not (Test-Path $cssFile)) {
    Write-Host "Warning: $cssFile not found. The presentation will use default styling." -ForegroundColor Yellow
    $useCss = $false
} else {
    $useCss = $true
}

# Install required packages if not already installed
Write-Host "Checking for required npm packages..." -ForegroundColor Cyan
$packagesToInstall = @("markdown-pdf")
foreach ($package in $packagesToInstall) {
    try {
        $checkPackage = npm list -g $package
        if ($checkPackage -match "empty") {
            throw "Package not installed"
        }
        Write-Host "$package is already installed." -ForegroundColor Green
    } catch {
        Write-Host "Installing $package globally..." -ForegroundColor Yellow
        npm install -g $package
    }
}

# Convert Markdown to PDF
Write-Host "Converting $markdownFile to PDF..." -ForegroundColor Green
if ($useCss) {
    markdown-pdf $markdownFile -o $outputPdf -s $cssFile -r landscape -b 1cm
    Write-Host "Applied custom styling from $cssFile" -ForegroundColor Green
} else {
    markdown-pdf $markdownFile -o $outputPdf -r landscape -b 1cm
}

# Check if conversion was successful
if (Test-Path $outputPdf) {
    Write-Host "PDF created successfully: $outputPdf" -ForegroundColor Green
    
    # Ask if user wants to open the PDF
    $openPdf = Read-Host "Would you like to open the PDF now? (y/n)"
    if ($openPdf -eq "y" -or $openPdf -eq "Y") {
        Write-Host "Opening PDF..." -ForegroundColor Cyan
        Start-Process $outputPdf
    }
} else {
    Write-Host "Error: PDF creation failed." -ForegroundColor Red
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Process completed." -ForegroundColor Cyan
