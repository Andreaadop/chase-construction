@echo off
REM Builds the projects gallery, all detail pages, and sitemap.
REM Run this after editing projects-data.js or adding photos.
cd /d "%~dp0"
node scripts/build-projects.mjs
if errorlevel 1 (
  echo.
  echo BUILD FAILED.
  pause
  exit /b 1
)
echo.
echo Done. Review changes with: git status
pause
