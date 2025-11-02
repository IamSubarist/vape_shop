"""
Скрипт для инициализации базы данных с тестовыми данными
"""
from database import SessionLocal, init_db, engine
from models import Product, Category
from sqlalchemy import inspect

def init_data(force_recreate=False):
    """Заполняет базу данных начальными данными"""
    # Пересоздаем таблицы, если нужно
    if force_recreate:
        print("Пересоздание таблиц...")
        init_db(drop_all=True)
    
    init_db()
    
    # Проверяем структуру базы данных
    try:
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        # Если таблица products существует, проверяем её структуру
        if 'products' in tables:
            columns = [col['name'] for col in inspector.get_columns('products')]
            if 'category_id' not in columns:
                print("Обнаружена старая структура базы данных (отсутствует category_id). Пересоздаем таблицы...")
                init_db(drop_all=True)
                init_db()
    except Exception as e:
        print(f"Ошибка при проверке структуры БД: {e}")
        print("Пересоздаем таблицы...")
        init_db(drop_all=True)
        init_db()
    
    db = SessionLocal()
    
    try:
        # Проверяем, есть ли уже данные
        try:
            if db.query(Product).first() or db.query(Category).first():
                print("База данных уже содержит данные. Пропускаем инициализацию.")
                return
        except Exception as e:
            # Если возникла ошибка при запросе (например, из-за несовпадения схемы)
            print(f"Обнаружена проблема со схемой базы данных при запросе: {e}")
            print("Пересоздаем таблицы...")
            db.close()
            init_db(drop_all=True)
            init_db()
            db = SessionLocal()
        
        # Словарь для хранения категорий по ключу (product_type, category_name)
        categories_dict = {}
        
        # Жидкости - группируем по title (которое является названием категории)
        liquids_data = [
            {
                "category_name": "АНАРХИЯ V2 HARD",
                "products": [
                    {
                        "title": "АНАРХИЯ V2 HARD",
                        "price": 350.0,
                        "taste": "Зеленое Яблоко🍏",
                        "volume": "30ml",
                        "nicotine": "20mg HARD (50mg)",
                    },
                    {
                        "title": "АНАРХИЯ V2 HARD",
                        "price": 350.0,
                        "taste": "Киви Драгонфрут🥝",
                        "volume": "30ml",
                        "nicotine": "20mg HARD (50mg)",
                    },
                    {
                        "title": "АНАРХИЯ V2 HARD",
                        "price": 350.0,
                        "taste": "Клюква Брусника🫐🍒",
                        "volume": "30ml",
                        "nicotine": "20mg HARD (50mg)",
                    },
                    {
                        "title": "АНАРХИЯ V2 HARD",
                        "price": 350.0,
                        "taste": "Малиновый Лимонад🍓🥤",
                        "volume": "30ml",
                        "nicotine": "20mg HARD (50mg)",
                    },
                ]
            },
            {
                "category_name": "Hotspot X Podonki Resonance EXTRA HARD",
                "products": [
                    {
                        "title": "Hotspot X Podonki Resonance EXTRA HARD",
                        "price": 360.0,
                        "taste": "Газировка тархун🥤",
                        "volume": "30ml",
                        "nicotine": "20mg Hard",
                    },
                    {
                        "title": "Hotspot X Podonki Resonance EXTRA HARD",
                        "price": 360.0,
                        "taste": "Освежающий Ананас🍍🧊",
                        "volume": "30ml",
                        "nicotine": "20mg Hard",
                    },
                ]
            },
            {
                "category_name": "RICK and MORTY BAD ACID EXTRA HARD",
                "products": [
                    {
                        "title": "RICK and MORTY BAD ACID EXTRA HARD",
                        "price": 360.0,
                        "taste": "Ананасовый леденец🍍🍭",
                        "volume": "30ml",
                        "nicotine": "20mg HARD (40-50mg)",
                    },
                    {
                        "title": "RICK and MORTY BAD ACID EXTRA HARD",
                        "price": 360.0,
                        "taste": "Киви лайм🥝🍋‍🟩",
                        "volume": "30ml",
                        "nicotine": "20mg HARD (40-50mg)",
                    },
                    {
                        "title": "RICK and MORTY BAD ACID EXTRA HARD",
                        "price": 360.0,
                        "taste": "Мармеладные червячки голубика малина🫐🍓",
                        "volume": "30ml",
                        "nicotine": "20mg HARD (40-50mg)",
                    },
                    {
                        "title": "RICK and MORTY BAD ACID EXTRA HARD",
                        "price": 360.0,
                        "taste": "Фруктовый Скитлс🍏🍎",
                        "volume": "30ml",
                        "nicotine": "20mg HARD (40-50mg)",
                    },
                ]
            },
            {
                "category_name": "ЗЛАЯ МОНАШКА",
                "products": [
                    {
                        "title": "ЗЛАЯ МОНАШКА",
                        "price": 360.0,
                        "taste": "Энергетик вишня лед⚡️🍒",
                        "volume": "30ml",
                        "nicotine": "70mg HARD",
                    },
                    {
                        "title": "ЗЛАЯ МОНАШКА",
                        "price": 360.0,
                        "taste": "Апельсин с кислой малиной🍊",
                        "volume": "30ml",
                        "nicotine": "70mg HARD",
                    },
                    {
                        "title": "ЗЛАЯ МОНАШКА",
                        "price": 360.0,
                        "taste": "Вишня черника🍒🫐",
                        "volume": "30ml",
                        "nicotine": "70mg HARD",
                    },
                    {
                        "title": "ЗЛАЯ МОНАШКА",
                        "price": 360.0,
                        "taste": "Жвачка земляника💕🍓",
                        "volume": "30ml",
                        "nicotine": "70mg HARD",
                    },
                ]
            },
        ]
        
        # Устройства (Pods)
        pods_data = [
            {
                "category_name": "GHOST SHISHA 15000",
                "products": [
                    {
                        "title": "GHOST SHISHA 15000",
                        "price": 800.0,
                        "taste": "Черника малина🫐🍓",
                        "puffs": 15000,
                    },
                    {
                        "title": "GHOST SHISHA 15000",
                        "price": 800.0,
                        "taste": "Персик лед🍑🧊",
                        "puffs": 15000,
                    },
                ]
            },
            {
                "category_name": "WAKA soPro 28000",
                "products": [
                    {
                        "title": "WAKA soPro 28000",
                        "price": 1150.0,
                        "taste": "Blue razz mint🍵",
                        "puffs": 28000,
                    },
                    {
                        "title": "WAKA soPro 28000",
                        "price": 1150.0,
                        "taste": "Raspberry Cola🍓🥤",
                        "puffs": 28000,
                    },
                ]
            },
        ]
        
        # Картриджи
        cartridges_data = [
            {
                "category_name": "Испаритель К-1 на Pasito 2",
                "products": [
                    {
                        "title": "Испаритель К-1 на Pasito 2",
                        "price": 220.0,
                    },
                ]
            },
        ]
        
        # Функция для создания категорий и продуктов
        def create_categories_and_products(data_list, product_type):
            for category_data in data_list:
                category_name = category_data["category_name"]
                
                # Создаем категорию
                category = Category(
                    name=category_name,
                    product_type=product_type
                )
                db.add(category)
                db.flush()  # Получаем ID категории
                
                # Создаем продукты для этой категории
                for product_data in category_data["products"]:
                    product = Product(
                        title=product_data["title"],
                        category_id=category.id,
                        category=product_type,
                        price=product_data["price"],
                        taste=product_data.get("taste"),
                        volume=product_data.get("volume"),
                        nicotine=product_data.get("nicotine"),
                        puffs=product_data.get("puffs"),
                    )
                    db.add(product)
        
        # Создаем все категории и продукты
        create_categories_and_products(liquids_data, "liquids")
        create_categories_and_products(pods_data, "pods")
        create_categories_and_products(cartridges_data, "cartridges")
        
        db.commit()
        
        # Подсчитываем количество
        total_categories = db.query(Category).count()
        total_products = db.query(Product).count()
        print(f"Успешно добавлено {total_categories} категорий и {total_products} товаров в базу данных!")
        
    except Exception as e:
        db.rollback()
        print(f"Ошибка при инициализации данных: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    init_data()