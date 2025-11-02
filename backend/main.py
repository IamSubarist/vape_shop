from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db, init_db

# Инициализация FastAPI
app = FastAPI(
    title="Vape Shop API",
    description="API для магазина вейп-продуктов",
    version="1.0.0"
)

# Настройка CORS для работы с React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Локальная разработка Vite
        "http://localhost:3000",  # Локальная разработка React
        "https://vape-shop-avec.onrender.com",  # Production frontend на Render
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Инициализация базы данных при старте приложения"""
    init_db()


@app.get("/")
def read_root():
    return {"message": "Vape Shop API", "docs": "/docs"}


@app.get("/api/products", response_model=List[schemas.Product])
def get_products(category: str = None, db: Session = Depends(get_db)):
    """Получить все товары или отфильтровать по категории"""
    query = db.query(models.Product)
    if category:
        query = query.filter(models.Product.category == category)
    products = query.all()
    return products


@app.get("/api/products/{product_id}", response_model=schemas.Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Получить товар по ID"""
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return product


@app.get("/api/products/category/{category}", response_model=List[schemas.Product])
def get_products_by_category(category: str, db: Session = Depends(get_db)):
    """Получить товары по категории"""
    products = db.query(models.Product).filter(models.Product.category == category).all()
    return products


@app.post("/api/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    """Создать новый товар"""
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

