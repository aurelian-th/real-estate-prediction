# filepath: d:\OneDrive - Technical University of Moldova\Year 1\sem2\sda\li\mvp\test-predictions.bat
@echo off
REM Moldova Insight Realty - Prediction Module Test Script

echo ====== Moldova Insight Realty Prediction Module Testing ======
echo Date: %date% %time%
echo =========================================================

REM Navigate to backend directory
cd backend-c

REM Build the test program (only prediction module)
echo Building prediction module test program...
gcc -o test_prediction test/test_prediction.c src/prediction.c -Isrc -lm -ljansson

REM Run the tests
echo Running prediction module tests...
test_prediction

echo =========================================================
echo Test execution complete.
cd ..
