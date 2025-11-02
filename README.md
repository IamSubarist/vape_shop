# Vape Shop - Fullstack приложение

Магазин вейп-продуктов с React frontend и FastAPI backend.

## Структура проекта

- `src/` - React frontend (Vite)
- `backend/` - FastAPI backend с SQLite базой данных

## Установка и запуск

### Backend (Python/FastAPI)

1. Перейдите в папку backend:
```bash
cd backend
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Инициализируйте базу данных с тестовыми данными:
```bash
python init_data.py
```

4. Запустите сервер:
```bash
uvicorn main:app --reload
```

Backend будет доступен по адресу: `http://localhost:8000`
- Swagger документация: `http://localhost:8000/docs`
- ReDoc документация: `http://localhost:8000/redoc`

### Frontend (React/Vite)

1. Установите зависимости (если еще не установлены):
```bash
npm install
```

2. Запустите dev сервер:
```bash
npm run dev
```

Frontend будет доступен по адресу: `http://localhost:5173`

## API Endpoints

- `GET /api/products` - Получить все товары (опционально: `?category=liquids`)
- `GET /api/products/{product_id}` - Получить товар по ID
- `GET /api/products/category/{category}` - Получить товары по категории
- `POST /api/products` - Создать новый товар

## Категории товаров

- `liquids` - Жидкости
- `pods` - Устройства (поды)
- `cartridges` - Катриджи

## Технологии

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

## База данных

SQLite база данных создается автоматически в файле `vape_shop.db` в папке `backend/`.
