const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // Получить все товары
  getAllProducts: async (category = null) => {
    try {
      const url = category 
        ? `${API_BASE_URL}/products?category=${category}`
        : `${API_BASE_URL}/products`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке товаров');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка API:', error);
      throw error;
    }
  },

  // Получить товары по категории
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`Ошибка при загрузке товаров категории ${category}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка API:', error);
      throw error;
    }
  },

  // Получить товар по ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Товар не найден');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка API:', error);
      throw error;
    }
  },
};

