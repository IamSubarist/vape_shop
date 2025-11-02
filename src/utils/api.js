// const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = 'https://vape-shop-backend.onrender.com/api';

export const api = {
  // Получить все категории
  getAllCategories: async (productType = null) => {
    try {
      const url = productType
        ? `${API_BASE_URL}/categories?product_type=${productType}`
        : `${API_BASE_URL}/categories`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке категорий");
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка API:", error);
      throw error;
    }
  },

  // Получить категорию по ID со всеми продуктами
  getCategoryById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`);
      if (!response.ok) {
        throw new Error("Категория не найдена");
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка API:", error);
      throw error;
    }
  },

  // Получить товары по ID категории
  getProductsByCategoryId: async (categoryId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories/${categoryId}/products`
      );
      if (!response.ok) {
        throw new Error(`Ошибка при загрузке товаров категории ${categoryId}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка API:", error);
      throw error;
    }
  },

  // Получить все товары
  getAllProducts: async (category = null) => {
    try {
      const url = category
        ? `${API_BASE_URL}/products?category=${category}`
        : `${API_BASE_URL}/products`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке товаров");
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка API:", error);
      throw error;
    }
  },

  // Получить товары по типу категории (liquids, pods, cartridges)
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/category/${category}`
      );
      if (!response.ok) {
        throw new Error(`Ошибка при загрузке товаров категории ${category}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка API:", error);
      throw error;
    }
  },

  // Получить товар по ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error("Товар не найден");
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка API:", error);
      throw error;
    }
  },
};
