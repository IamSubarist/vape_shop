from pydantic import BaseModel
from typing import Optional, List


class CategoryBase(BaseModel):
    name: str
    product_type: str
    image: Optional[str] = None
    description: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True


class CategoryWithProducts(Category):
    products: List['Product'] = []

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    title: str
    category_id: int
    category: str
    price: float
    taste: Optional[str] = None
    volume: Optional[str] = None
    nicotine: Optional[str] = None
    puffs: Optional[int] = None
    image: Optional[str] = None
    description: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True


# Разрешаем forward references для Pydantic v2
CategoryWithProducts.model_rebuild()
