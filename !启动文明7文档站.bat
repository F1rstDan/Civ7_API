@echo off
chcp 65001 >nul 2>&1
title Civ7 Mod API 文档站

echo.
echo  ========================================
echo   Civ7 Mod API 文档站 启动器
echo  ========================================
echo.

cd /d "%~dp0"

:: 检查 node 是否安装
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [错误] 未检测到 Node.js，请先安装：
    echo  https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: 检查依赖是否安装
if not exist "node_modules" (
    echo  [信息] 首次运行，正在安装依赖...
    echo.
    call npm install
    echo.
)

echo  [信息] 正在启动文档服务器...
echo  [信息] 启动后请在浏览器中访问: http://localhost:5173
echo  [信息] 按 Ctrl+C 可停止服务器
echo.

:: 启动 VitePress 开发服务器
call npx vitepress dev docs --port 5173

pause
