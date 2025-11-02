import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Showcase } from "../../components/Showcase/Showcase";
import { api } from "../../utils/api";
import { categoryToSlug } from "../../utils/transliterate";

export const CategoryProducts = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Определяем тип продукта из пути
  // Путь может быть: /liquids/:slug, /pods/:slug, /cartridges/:slug
  const pathParts = location.pathname.split("/").filter(Boolean);
  let productType = pathParts[0] || "liquids";
  
  // Если первый элемент пути пустой или не определен, значит это корневой путь
  // Для роутов /liquids/:slug первый элемент будет "liquids"
  
  // Получаем базовый путь для возврата
  const getBasePath = () => {
    // Если это liquids (роут /liquids/:slug или /), возвращаемся на корень
    if (productType === "liquids") {
      return "/"; // Категории жидкостей находятся на корневом пути
    }
    return `/${productType}`;
  };
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Получаем все категории данного типа
        const categories = await api.getAllCategories(productType);

        // Находим категорию по slug
        const foundCategory = categories.find(
          (cat) => categoryToSlug(cat.name) === categorySlug
        );

        if (!foundCategory) {
          setError("Категория не найдена");
          return;
        }

        setCategory(foundCategory);

        // Получаем товары этой категории
        const categoryProducts = await api.getProductsByCategoryId(
          foundCategory.id
        );
        setProducts(categoryProducts);
      } catch (err) {
        setError("Не удалось загрузить данные");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categorySlug, productType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400">Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400">Категория не найдена</p>
      </div>
    );
  }

  return (
    <div>
      {/* Заголовок с названием категории */}
      <div className="mb-6">
        <button
          onClick={() => navigate(getBasePath())}
          className="mb-4 text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад к категориям
        </button>
        <h1
          className="text-3xl font-bold text-transparent bg-clip-text animated-title"
          style={{
            backgroundImage:
              "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4, #7C3AED)",
            backgroundSize: "200% auto",
          }}
        >
          {category.name}
        </h1>
      </div>

      {/* Отображение товаров */}
      <Showcase
        title={category.name}
        dataUrl={products.map((p) => ({
          ...p,
          price: p.price.toString(),
        }))}
        type={productType}
        isCategory={false}
      />
    </div>
  );
};

