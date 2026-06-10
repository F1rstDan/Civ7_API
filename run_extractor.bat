@echo off
cls
echo ==================================================
echo         Civ7 API Extractor and Compiler Tool
echo ==================================================
echo.
echo Please select an option:
echo [0] Run All Steps (1 to 3)
echo [1] Step 1: Run Draft Mode (extract_civ7_api --draft)
echo [2] Step 2: Update Filter Config (init_filter)
echo [3] Step 3: Run Compile Mode (extract_civ7_api --compile)
echo.
set /p opt="Enter your choice (0-3): "

if "%opt%"=="0" goto run_all
if "%opt%"=="1" goto run_draft
if "%opt%"=="2" goto run_filter
if "%opt%"=="3" goto run_compile

echo Invalid choice! Exiting.
goto end

:run_all
echo.
echo ==================================================
echo [1/3] Running Draft Mode...
echo ==================================================
node scripts/extract_civ7_api.js --draft
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Draft Mode failed!
    goto error
)

echo.
echo ==================================================
echo [2/3] Updating Filter Config...
echo ==================================================
node scripts/init_filter.js
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Updating filter failed!
    goto error
)

echo.
echo ==================================================
echo [3/3] Running Compile Mode...
echo ==================================================
node scripts/extract_civ7_api.js --compile
if %ERRORLEVEL% neq 0 (
    echo.
    echo [WARNING] Compilation failed!
    echo Please make sure unknown list in docs\data\api_filter.json is empty.
    goto end
)
echo.
echo ==================================================
echo SUCCESS: All steps completed successfully!
echo ==================================================
goto end

:run_draft
echo.
echo Running Draft Mode...
node scripts/extract_civ7_api.js --draft
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Draft Mode failed!
    goto error
)
echo SUCCESS: Draft Mode completed.
goto end

:run_filter
echo.
echo Updating Filter Config...
node scripts/init_filter.js
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Updating filter failed!
    goto error
)
echo SUCCESS: Filter Config updated.
goto end

:run_compile
echo.
echo Running Compile Mode...
node scripts/extract_civ7_api.js --compile
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Compilation failed!
    echo Please check docs\data\api_filter.json.
    goto error
)
echo SUCCESS: Compilation completed successfully.
goto end

:error
echo.
echo [FATAL] Process interrupted due to errors.

:end
echo.
pause
