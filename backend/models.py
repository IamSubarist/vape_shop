from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # Название категории (например, "АНАРХИЯ V2 HARD")
    product_type = Column(String, nullable=False)  # liquids, pods, cartridges
    image = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    
    # Связь с продуктами
    products = relationship("Product", back_populates="category_obj")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    category = Column(String, nullable=False)  # liquids, pods, cartridges (для обратной совместимости)
    price = Column(Float, nullable=False)
    taste = Column(String, nullable=True)
    volume = Column(String, nullable=True)
    nicotine = Column(String, nullable=True)
    puffs = Column(Integer, nullable=True)
    image = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    
    # Связь с категорией
    category_obj = relationship("Category", back_populates="products")

