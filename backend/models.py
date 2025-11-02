from sqlalchemy import Column, Integer, String, Float, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)  # liquids, pods, cartridges
    price = Column(Float, nullable=False)
    taste = Column(String, nullable=True)
    volume = Column(String, nullable=True)
    nicotine = Column(String, nullable=True)
    puffs = Column(Integer, nullable=True)
    image = Column(String, nullable=True)
    description = Column(Text, nullable=True)

