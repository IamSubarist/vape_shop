from pydantic import BaseModel
from typing import Optional


class ProductBase(BaseModel):
    title: str
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

