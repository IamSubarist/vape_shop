import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { categoryToSlug } from "../../utils/transliterate";

// Компонент для отображения деталей продукта
const ProductDetails = ({ item, type }) => {
  const details = [];

  if (item.taste) {
    details.push({ label: "Вкус:", value: item.taste });
  }

  if (item.volume) {
    details.push({ label: "Объем:", value: item.volume });
  }

  if (item.nicotine) {
    details.push({ label: "Крепость:", value: item.nicotine });
  }

  if (item.puffs) {
    details.push({
      label: "Кол-во затяжек:",
      value: Number(item.puffs).toLocaleString(),
    });
  }

  if (details.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 text-sm">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gray-400">{detail.label}</span>
          <span className="text-gray-200 font-medium">{detail.value}</span>
        </div>
      ))}
    </div>
  );
};

// Компонент карточки продукта
const ProductCard = ({ item, type, index }) => {
  const handleBuyClick = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику добавления в корзину
    console.log("Добавить в корзину:", item);
  };

  // Форматирование данных товара для копирования
  const formatProductData = (product) => {
    let text = `🛍️ ${product.title}\n\n`;

    if (product.taste) {
      text += `Вкус: ${product.taste}\n`;
    }

    if (product.volume) {
      text += `Объем: ${product.volume}\n`;
    }

    if (product.nicotine) {
      text += `Крепость: ${product.nicotine}\n`;
    }

    if (product.puffs) {
      text += `Кол-во затяжек: ${Number(product.puffs).toLocaleString()}\n`;
    }

    text += `\n💰 Цена: ${Number(product.price).toLocaleString()}₽`;

    return text;
  };

  // Обработчик клика на ссылку с копированием данных
  const handleLinkClick = async (e) => {
    e.preventDefault();
    const linkUrl = e.currentTarget.href;

    try {
      const productText = formatProductData(item);
      await navigator.clipboard.writeText(productText);
      // Открываем ссылку после успешного копирования
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Ошибка при копировании в буфер обмена:", err);
      // Даже если копирование не удалось, открываем ссылку
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    }
  };

  // CSS анимация появления с задержкой
  const cardStyle = {
    animationDelay: `${index * 0.08}s`,
  };

  return (
    <div
      className="group relative rounded-2xl overflow-visible card-enter"
      style={cardStyle}
    >
      {/* Градиентная рамка с красивым свечением */}
      <div
        className="absolute -inset-[1px] rounded-2xl border-frame"
        style={{
          background:
            "linear-gradient(135deg, #7C3AED, #EC4899, #F97316, #06B6D4, #7C3AED)",
          backgroundSize: "200% 200%",
          animation: "border-glow 4s ease infinite",
          opacity: 0.6,
        }}
      />

      {/* Внутренняя тень для глубины */}
      <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-br from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Градиентный фон с эффектом подсветки при hover */}
      <div className="absolute inset-0 rounded-2xl card-glow-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Основной фон карточки */}
      <div
        className="relative bg-gradient-to-br from-[#1a1625] via-[#25213C] to-[#1e2d3f] rounded-2xl overflow-hidden card-inner"
        style={{ margin: "1px" }}
      >
        {/* Изображение товара */}
        <div className="relative overflow-hidden bg-gradient-to-b from-black/40 to-black/20">
          <div className="w-full h-[240px] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <p className="text-2xl text-center text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
              Картинка товара
            </p>
          </div>

          {/* Бейдж "Популярный" (можно сделать динамическим) */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50">
              Популярный
            </span>
          </div>
        </div>

        {/* Контент карточки */}
        <div className="relative p-6 flex flex-col gap-4">
          {/* Заголовок */}
          <div>
            <p
              className="text-xl font-bold text-transparent bg-clip-text animated-title leading-tight"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4, #7C3AED)",
                backgroundSize: "200% auto",
              }}
            >
              {item.title}
            </p>
          </div>

          {/* Детали продукта */}
          <ProductDetails item={item} type={type} />

          {/* Разделитель */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

          {/* Цена и кнопка */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 mb-1">Цена</p>
              <p
                className="text-2xl font-bold text-transparent bg-clip-text animated-price leading-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #a855f7, #ec4899, #f59e0b, #a855f7)",
                  backgroundSize: "200% auto",
                }}
              >
                {Number(item.price).toLocaleString()}₽
              </p>
              <p className="text-xs text-gray-500">за штуку</p>
            </div>

            {/* Кнопка "Купить" с оптимизированным свечением */}
            <a
              href="https://t.me/imsubarist555"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
            >
              <button
                // onClick={handleBuyClick}
                className="relative px-6 py-3 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 button-glow"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="size-4.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Купить
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент карточки категории
const CategoryCard = ({ category, type, index }) => {
  const navigate = useNavigate();
  const [productsCount, setProductsCount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Загружаем количество товаров при загрузке компонента
  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        setLoading(true);
        const products = await api.getProductsByCategoryId(category.id);
        setProductsCount(products.length);
      } catch (error) {
        console.error("Ошибка при загрузке количества товаров:", error);
        setProductsCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsCount();
  }, [category.id]);

  // CSS анимация появления с задержкой
  const cardStyle = {
    animationDelay: `${index * 0.08}s`,
  };

  const handleViewProducts = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const slug = categoryToSlug(category.name);
    navigate(`/${type}/${slug}`);
  };

  const handleCardClick = (e) => {
    // Если клик был по кнопке, не обрабатываем клик по карточке
    if (e.target.closest("button")) {
      return;
    }
    handleViewProducts(e);
  };

  // Генерируем уникальный градиент на основе индекса
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ];
  const gradient = gradients[index % gradients.length];

  // Уникальный ID для паттерна
  const patternId = `${category.id}-${index}`;

  return (
    <div
      className="group relative rounded-2xl overflow-visible card-enter cursor-pointer"
      style={cardStyle}
      onClick={handleCardClick}
    >
      {/* Градиентная рамка с красивым свечением */}
      <div
        className="absolute -inset-[1px] rounded-2xl border-frame"
        style={{
          background:
            "linear-gradient(135deg, #7C3AED, #EC4899, #F97316, #06B6D4, #7C3AED)",
          backgroundSize: "200% 200%",
          animation: "border-glow 4s ease infinite",
          opacity: 0.6,
        }}
      />

      {/* Внутренняя тень для глубины */}
      <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-br from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Градиентный фон с эффектом подсветки при hover */}
      <div className="absolute inset-0 rounded-2xl card-glow-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Основной фон карточки */}
      <div
        className="relative bg-gradient-to-br from-[#1a1625] via-[#25213C] to-[#1e2d3f] rounded-2xl overflow-hidden card-inner"
        style={{ margin: "1px" }}
      >
        {/* Красивый многослойный SVG фон */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Красивые градиенты */}
            <linearGradient
              id={`gradient-main-${patternId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#764ba2" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f093fb" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id={`gradient-pattern-${patternId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
            </linearGradient>

            {/* Радиальный градиент для фона */}
            <radialGradient id={`bg-radial-${patternId}`} cx="50%" cy="50%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#764ba2" stopOpacity="0.05" />
            </radialGradient>

            {/* Красивые паттерны */}
            {(() => {
              const seed = category.id + index * 17;
              const patternType = seed % 4;

              if (patternType === 0) {
                // Точки с градиентом
                return (
                  <pattern
                    id={`pattern-${patternId}`}
                    x="0"
                    y="0"
                    width="48"
                    height="48"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="2"
                      fill={`url(#gradient-pattern-${patternId})`}
                      opacity="0.6"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="1.5"
                      fill={`url(#gradient-pattern-${patternId})`}
                      opacity="0.4"
                    />
                    <circle
                      cx="48"
                      cy="0"
                      r="1.5"
                      fill={`url(#gradient-pattern-${patternId})`}
                      opacity="0.4"
                    />
                    <circle
                      cx="0"
                      cy="48"
                      r="1.5"
                      fill={`url(#gradient-pattern-${patternId})`}
                      opacity="0.4"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="1.5"
                      fill={`url(#gradient-pattern-${patternId})`}
                      opacity="0.4"
                    />
                  </pattern>
                );
              } else if (patternType === 1) {
                // Геометрическая сетка
                return (
                  <pattern
                    id={`pattern-${patternId}`}
                    x="0"
                    y="0"
                    width="70"
                    height="70"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="70"
                      height="70"
                      fill="none"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="0.8"
                      opacity="0.3"
                    />
                    <line
                      x1="35"
                      y1="0"
                      x2="35"
                      y2="70"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="0.6"
                      opacity="0.25"
                    />
                    <line
                      x1="0"
                      y1="35"
                      x2="70"
                      y2="35"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="0.6"
                      opacity="0.25"
                    />
                    <circle
                      cx="35"
                      cy="35"
                      r="3"
                      fill={`url(#gradient-pattern-${patternId})`}
                      opacity="0.4"
                    />
                  </pattern>
                );
              } else if (patternType === 2) {
                // Круговые концентрические формы
                return (
                  <pattern
                    id={`pattern-${patternId}`}
                    x="0"
                    y="0"
                    width="90"
                    height="90"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="45"
                      cy="45"
                      r="20"
                      fill="none"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="1"
                      opacity="0.35"
                    />
                    <circle
                      cx="45"
                      cy="45"
                      r="30"
                      fill="none"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="0.8"
                      opacity="0.3"
                    />
                    <circle
                      cx="45"
                      cy="45"
                      r="8"
                      fill={`url(#gradient-pattern-${patternId})`}
                      opacity="0.5"
                    />
                  </pattern>
                );
              } else {
                // Диагональные линии
                return (
                  <pattern
                    id={`pattern-${patternId}`}
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <line
                      x1="0"
                      y1="30"
                      x2="60"
                      y2="30"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="0.8"
                      opacity="0.3"
                    />
                    <line
                      x1="30"
                      y1="0"
                      x2="30"
                      y2="60"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="0.8"
                      opacity="0.3"
                    />
                    <line
                      x1="0"
                      y1="0"
                      x2="60"
                      y2="60"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="0.6"
                      opacity="0.2"
                    />
                    <line
                      x1="60"
                      y1="0"
                      x2="0"
                      y2="60"
                      stroke={`url(#gradient-pattern-${patternId})`}
                      strokeWidth="0.6"
                      opacity="0.2"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="2.5"
                      fill={`url(#gradient-pattern-${patternId})`}
                      opacity="0.5"
                    />
                  </pattern>
                );
              }
            })()}
          </defs>

          {/* Фоновый радиальный градиент */}
          <rect
            width="100%"
            height="100%"
            fill={`url(#bg-radial-${patternId})`}
          />

          {/* Крупные мягкие декоративные формы */}
          <ellipse
            cx="340"
            cy="50"
            rx="100"
            ry="70"
            fill={`url(#gradient-main-${patternId})`}
            opacity="0.25"
            className="group-hover:opacity-0.35 transition-opacity duration-500"
          />
          <ellipse
            cx="60"
            cy="250"
            rx="90"
            ry="60"
            fill={`url(#gradient-main-${patternId})`}
            opacity="0.2"
            className="group-hover:opacity-0.3 transition-opacity duration-500"
          />
          <circle
            cx="200"
            cy="150"
            r="70"
            fill={`url(#gradient-main-${patternId})`}
            opacity="0.15"
            className="group-hover:opacity-0.25 transition-opacity duration-500"
          />

          {/* Паттерн поверх всего */}
          <rect
            width="100%"
            height="100%"
            fill={`url(#pattern-${patternId})`}
          />

          {/* Плавные волнообразные акценты */}
          <g
            opacity="0.4"
            className="group-hover:opacity-0.5 transition-opacity duration-300"
          >
            <path
              d="M0,220 Q120,160 240,200 T400,180 L400,300 L0,300 Z"
              fill={`url(#gradient-main-${patternId})`}
              opacity="0.2"
            />
            <path
              d="M400,0 Q280,60 160,20 T0,60 L0,120 L400,120 Z"
              fill={`url(#gradient-main-${patternId})`}
              opacity="0.15"
            />
          </g>
        </svg>

        {/* Контент карточки */}
        <div className="relative p-8 flex flex-col gap-6 min-h-[280px]">
          {/* Иконка/символ категории */}
          <div className="flex items-center justify-center mb-2">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              style={{
                background: gradient,
              }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>

          {/* Заголовок */}
          <div className="text-center">
            <h3
              className="text-2xl font-bold text-transparent bg-clip-text mb-2 leading-tight group-hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff, #e0e0e0, #fff)",
                backgroundSize: "200% auto",
              }}
            >
              {category.name}
            </h3>
          </div>

          {/* Информация о количестве товаров */}
          <div className="flex items-center justify-center gap-3 mt-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
              <svg
                className="w-4 h-4 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span className="text-sm text-gray-300 font-medium">
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  `${productsCount !== null ? productsCount : "0"} товаров`
                )}
              </span>
            </div>
          </div>

          {/* Кнопка */}
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleViewProducts}
              className="relative px-8 py-3 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-300 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 button-glow w-full group-hover:shadow-lg group-hover:shadow-purple-500/50"
              style={{
                backgroundSize: "200% auto",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Смотреть товары</span>
                <svg
                  className="size-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              {/* Анимированный градиент на кнопке */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transform: "translateX(-100%)",
                  animation: "shimmer 2s infinite",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Showcase = ({
  title,
  dataUrl,
  type = "liquids",
  isCategory = false,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataUrl.map((item, index) =>
          isCategory ? (
            <CategoryCard
              key={item.id}
              category={item}
              type={type}
              index={index}
            />
          ) : (
            <ProductCard key={item.id} item={item} type={type} index={index} />
          )
        )}
      </div>
    </div>
  );
};
