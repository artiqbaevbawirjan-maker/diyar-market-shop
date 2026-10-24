@echo off
chcp 65001 >nul
title Diyar Market — GitHub-qa juklew
cd /d "%~dp0"
echo =======================================================
echo   🚀 Diyar Market жойбарын GitHub-қа жүклеў...
echo   Репозиторий: https://github.com/artiqbaevbawirjan-maker/diyar-market-shop.git
echo =======================================================
echo.

git init
git add .
git commit -m "Diyar Market — Frontend толық жуўмақланды (Қарақалпақ тили, кирилл)"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/artiqbaevbawirjan-maker/diyar-market-shop.git
git push -u origin main

echo.
echo =======================================================
echo   Жүклеў жуўмақланды! GitHub-та тексериң:
echo   https://github.com/artiqbaevbawirjan-maker/diyar-market-shop
echo =======================================================
pause
