@echo off
echo Установка зависимостей...
pip install -r requirements.txt

echo.
echo Инициализация базы данных...
python init_data.py

echo.
echo Запуск сервера FastAPI...
uvicorn main:app --reload

