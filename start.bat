@echo off
REM Weer App Startup Script for Windows
echo Starting Weer App...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

REM Start the application
echo Launching Electron app...
call npm start
