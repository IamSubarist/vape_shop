# Vape Shop Backend API

Backend для магазина вейп-продуктов на FastAPI с SQLite базой данных.

## Установка

1. Установите зависимости:

```bash
pip install -r requirements.txt
```

2. Инициализируйте базу данных с тестовыми данными:

```bash
python init_data.py
```

## Запуск

Запустите сервер:

```bash
uvicorn main:app --reload
```

Сервер будет доступен по адресу: `http://localhost:8000`

## API Документация

После запуска сервера автоматическая документация Swagger доступна по адресу:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

- `GET /api/products` - Получить все товары (опционально с фильтром по категории: `?category=liquids`)
- `GET /api/products/{product_id}` - Получить товар по ID
- `GET /api/products/category/{category}` - Получить товары по категории (liquids, pods, cartridges)
- `POST /api/products` - Создать новый товар

## База данных

Используется SQLite, файл базы данных создается автоматически: `vape_shop.db`
