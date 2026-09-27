@echo off
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js e npm nao foram encontrados no PATH.
  echo Instale o Node.js e tente novamente.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Instalando dependencias do projeto...
  call npm install
  if errorlevel 1 (
    echo Falha na instalacao das dependencias.
    pause
    exit /b 1
  )
)

start "Servidor do site" cmd /k "cd /d "%~dp0" && npm run dev"

timeout /t 20 >nul
start "" "http://localhost:3000"
