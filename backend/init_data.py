"""
Скрипт для инициализации базы данных с тестовыми данными
"""
from database import SessionLocal, init_db
from models import Product

def init_data():
    """Заполняет базу данных начальными данными"""
    init_db()
    db = SessionLocal()
    
    try:
        # Проверяем, есть ли уже данные
        if db.query(Product).first():
            print("База данных уже содержит данные. Пропускаем инициализацию.")
            return
        
        # Жидкости
        liquids = [
            {
                "title": "АНАРХИЯ V2 HARD",
                "category": "liquids",
                "price": 350.0,
                "taste": "Зеленое Яблоко🍏",
                "volume": "30ml",
                "nicotine": "20mg HARD (50mg)",
            },
            {
                "title": "АНАРХИЯ V2 HARD",
                "category": "liquids",
                "price": 350.0,
                "taste": "Киви Драгонфрут🥝",
                "volume": "30ml",
                "nicotine": "20mg HARD (50mg)",
            },
            {
                "title": "АНАРХИЯ V2 HARD",
                "category": "liquids",
                "price": 350.0,
                "taste": "Клюква Брусника🫐🍒",
                "volume": "30ml",
                "nicotine": "20mg HARD (50mg)",
            },
            {
                "title": "АНАРХИЯ V2 HARD",
                "category": "liquids",
                "price": 350.0,
                "taste": "Малиновый Лимонад🍓🥤",
                "volume": "30ml",
                "nicotine": "20mg HARD (50mg)",
            },
            {
                "title": "Hotspot X Podonki Resonance EXTRA HARD",
                "category": "liquids",
                "price": 360.0,
                "taste": "Газировка тархун🥤",
                "volume": "30ml",
                "nicotine": "20mg Hard",
            },
            {
                "title": "Hotspot X Podonki Resonance EXTRA HARD",
                "category": "liquids",
                "price": 360.0,
                "taste": "Освежающий Ананас🍍🧊",
                "volume": "30ml",
                "nicotine": "20mg Hard",
            },
            {
                "title": "RICK and MORTY BAD ACID EXTRA HARD",
                "category": "liquids",
                "price": 360.0,
                "taste": "Ананасовый леденец🍍🍭",
                "volume": "30ml",
                "nicotine": "20mg HARD (40-50mg)",
            },
            {
                "title": "RICK and MORTY BAD ACID EXTRA HARD",
                "category": "liquids",
                "price": 360.0,
                "taste": "Киви лайм🥝🍋‍🟩",
                "volume": "30ml",
                "nicotine": "20mg HARD (40-50mg)",
            },
            {
                "title": "RICK and MORTY BAD ACID EXTRA HARD",
                "category": "liquids",
                "price": 360.0,
                "taste": "Мармеладные червячки голубика малина🫐🍓",
                "volume": "30ml",
                "nicotine": "20mg HARD (40-50mg)",
            },
            {
                "title": "RICK and MORTY BAD ACID EXTRA HARD",
                "category": "liquids",
                "price": 360.0,
                "taste": "Фруктовый Скитлс🍏🍎",
                "volume": "30ml",
                "nicotine": "20mg HARD (40-50mg)",
            },
            {
                "title": "ЗЛАЯ МОНАШКА",
                "category": "liquids",
                "price": 360.0,
                "taste": "Энергетик вишня лед⚡️🍒",
                "volume": "30ml",
                "nicotine": "70mg HARD",
            },
            {
                "title": "ЗЛАЯ МОНАШКА",
                "category": "liquids",
                "price": 360.0,
                "taste": "Апельсин с кислой малиной🍊",
                "volume": "30ml",
                "nicotine": "70mg HARD",
            },
            {
                "title": "ЗЛАЯ МОНАШКА",
                "category": "liquids",
                "price": 360.0,
                "taste": "Вишня черника🍒🫐",
                "volume": "30ml",
                "nicotine": "70mg HARD",
            },
            {
                "title": "ЗЛАЯ МОНАШКА",
                "category": "liquids",
                "price": 360.0,
                "taste": "Жвачка земляника💕🍓",
                "volume": "30ml",
                "nicotine": "70mg HARD",
            },
        ]
        
        # Устройства (Pods)
        pods = [
            {
                "title": "GHOST SHISHA 15000",
                "category": "pods",
                "price": 800.0,
                "taste": "Черника малина🫐🍓",
                "puffs": 15000,
            },
            {
                "title": "GHOST SHISHA 15000",
                "category": "pods",
                "price": 800.0,
                "taste": "Персик лед🍑🧊",
                "puffs": 15000,
            },
            {
                "title": "WAKA soPro 28000",
                "category": "pods",
                "price": 1150.0,
                "taste": "Blue razz mint🍵",
                "puffs": 28000,
            },
            {
                "title": "WAKA soPro 28000",
                "category": "pods",
                "price": 1150.0,
                "taste": "Raspberry Cola🍓🥤",
                "puffs": 28000,
            },
        ]
        
        # Катриджи
        cartridges = [
            {
                "title": "Испаритель К-1 на Pasito 2",
                "category": "cartridges",
                "price": 220.0,
            },
        ]
        
        # Добавляем все товары в БД
        all_products = liquids + pods + cartridges
        for product_data in all_products:
            product = Product(**product_data)
            db.add(product)
        
        db.commit()
        print(f"Успешно добавлено {len(all_products)} товаров в базу данных!")
        
    except Exception as e:
        db.rollback()
        print(f"Ошибка при инициализации данных: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    init_data()

