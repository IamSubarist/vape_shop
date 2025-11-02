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


@app.get("/api/categories", response_model=List[schemas.Category])
def get_categories(product_type: str = None, db: Session = Depends(get_db)):
    """Получить все категории или отфильтровать по типу продукта"""
    query = db.query(models.Category)
    if product_type:
        query = query.filter(models.Category.product_type == product_type)
    categories = query.all()
    return categories


@app.get("/api/categories/{category_id}", response_model=schemas.CategoryWithProducts)
def get_category(category_id: int, db: Session = Depends(get_db)):
    """Получить категорию по ID со всеми продуктами"""
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    return category


@app.get("/api/products", response_model=List[schemas.Product])
def get_products(category: str = None, category_id: int = None, db: Session = Depends(get_db)):
    """Получить все товары или отфильтровать по категории"""
    query = db.query(models.Product)
    if category_id:
        query = query.filter(models.Product.category_id == category_id)
    elif category:
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
    """Получить товары по типу категории (liquids, pods, cartridges)"""
    products = db.query(models.Product).filter(models.Product.category == category).all()
    return products


@app.get("/api/categories/{category_id}/products", response_model=List[schemas.Product])
def get_products_by_category_id(category_id: int, db: Session = Depends(get_db)):
    """Получить товары по ID категории"""
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    products = db.query(models.Product).filter(models.Product.category_id == category_id).all()
    return products


@app.post("/api/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    """Создать новый товар"""
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

