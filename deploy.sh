#!/bin/bash
# Moldova Insight Realty - Deployment Script

echo "====== Moldova Insight Realty Deployment ======"
echo "Date: $(date)"
echo "================================================"

# GitHub Deployment (if needed)
if [ "$1" == "--github" ]; then
  echo "Preparing for GitHub deployment..."
  
  # Copy GitHub-specific README
  cp README-GITHUB.md README.md
  
  # Add files to git
  git add .
  
  # Commit changes
  git commit -m "Deployment update: $(date)"
  
  # Push to GitHub
  git push origin main
  
  echo "GitHub deployment completed."
  exit 0
fi

# Frontend Build
echo "Building frontend..."
cd frontend-react
npm install
npm run build
echo "Frontend build completed."

echo ""
echo "In a full implementation, this script would:"
echo "----------------------------------------"
echo "1. Compile the C backend:"
echo "   cd backend-c && make clean && make"
echo ""
echo "2. Set up the PostgreSQL database:"
echo "   psql -U postgres -c 'CREATE DATABASE moldova_insight_realty'"
echo "   psql -U postgres -d moldova_insight_realty -f backend-c/sql/001_schema.sql"
echo "   psql -U postgres -d moldova_insight_realty -f backend-c/sql/002_sample_data.sql"
echo ""
echo "3. Deploy to a production server:"
echo "   - Copy frontend build files to web server directory"
echo "   - Copy backend executable to server"
echo "   - Configure environment variables"
echo "   - Restart services (nginx, backend service)"
echo ""
echo "4. For GitHub deployment:"
echo "   - Run this script with --github flag to push to GitHub"
echo "   - Example: ./deploy.sh --github"
echo ""
echo "For the visual MVP, simply serve the frontend build:"
echo "cd frontend-react && npx serve -s dist -p 3000"
echo ""
echo "================================================"
