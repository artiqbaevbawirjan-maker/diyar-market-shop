@echo off
title Diyar Market — Vercel-ge juklew
cd /d "%~dp0"
echo =======================================================
echo   🚀 Diyar Market Frontend Vercel-ge juklenbekte...
echo =======================================================
echo.
echo Eger Vercel-ge birinshi ret juklep atirgan bolsaniz:
echo 1. Brauzerde Vercel akkountinizga ruxsat berin.
echo 2. Berilgen sorawlarga Enter tuymesin basin (defolt sazlawlar).
echo.
"C:\Program Files\nodejs\npx.cmd" vercel --prod
echo.
echo =======================================================
echo   Juklew tamamlandi! Siltemeni brauzerde ashin.
echo =======================================================
pause
