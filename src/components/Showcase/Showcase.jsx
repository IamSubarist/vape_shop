import React from "react";

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

export const Showcase = ({ title, dataUrl, type = "liquids" }) => {
  return (
    <div>
      {/* <p
        className="text-[32px] font-bold text-transparent bg-clip-text"
        style={gradientTitleStyle}
      >
        {title}
      </p> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataUrl.map((item, index) => (
          <ProductCard key={item.id} item={item} type={type} index={index} />
        ))}
      </div>
    </div>
  );
};
