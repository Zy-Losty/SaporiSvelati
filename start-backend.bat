@echo off
color 0A
title Avvio Sapori Svelati Backend
echo ==============================================
echo   AVVIAMENTO DEL BACKEND DI SAPORI SVELATI
echo ==============================================

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Node.js non e' installato su questo computer.
    echo Per poter utilizzare il pannello di controllo e le newsletter,
    echo e' necessario scaricare e installare Node.js.
    echo.
    echo Scaricalo qui: https://nodejs.org/
    echo.
    echo Dopo l'installazione, riavvia questo file.
    pause
    exit /b
)

echo Verifico le dipendenze (NPM)...
if not exist node_modules (
    echo Installo le librerie necessarie (questa operazione avviene solo la prima volta)...
    call npm install
)

echo.
echo Avvio il server...
echo.
echo PREMI [CTRL + C] in questa finestra per spegnere il server.
echo.

node backend/server.js

pause
