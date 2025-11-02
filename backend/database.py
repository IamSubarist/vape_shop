from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
import os

# SQLite база данных
SQLALCHEMY_DATABASE_URL = "sqlite:///./vape_shop.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db(drop_all=False):
    """Создает таблицы в базе данных"""
    if drop_all:
        # Удаляем все таблицы и пересоздаем их
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)
    else:
        # Просто создаем отсутствующие таблицы
        Base.metadata.create_all(bind=engine)


def get_db():
    """Dependency для получения сессии БД"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

