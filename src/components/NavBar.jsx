import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`
        relative flex-1 flex items-center justify-center px-6 py-4
        transition-colors duration-200 ease-out
        group
      `}
    >
      {/* Текст */}
      <span
        className={`
          text-lg font-medium
          transition-colors duration-200
          ${
            isActive
              ? "text-gray-100"
              : "text-gray-400 group-hover:text-gray-200"
          }
        `}
      >
        {label}
      </span>

      {/* Индикатор активной страницы */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-0.5
          bg-gradient-to-r from-purple-400/60 to-pink-400/60
          transition-all duration-200 ease-out
          ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
        `}
      />

      {/* Hover эффект - тонкая линия */}
      <div
        className={`
          absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5
          bg-gray-400/40
          transition-all duration-200 group-hover:w-3/4
          ${isActive ? "w-0" : ""}
        `}
      />
    </Link>
  );
};

export const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Жидкости", matchPaths: ["/", "/liquids"] },
    { path: "/cartridges", label: "Картриджи", matchPaths: ["/cartridges"] },
    { path: "/pods", label: "Устройства", matchPaths: ["/pods"] },
  ];

  // Функция для определения активного пункта меню
  const isNavItemActive = (item) => {
    const path = location.pathname;
    
    // Для жидкостей проверяем корневой путь и путь /liquids/...
    if (item.path === "/") {
      return path === "/" || path.startsWith("/liquids/");
    }
    
    // Для других пунктов проверяем точное совпадение и подпути
    return item.matchPaths.some(matchPath => 
      path === matchPath || path.startsWith(`${matchPath}/`)
    );
  };

  return (
    <nav className="w-full">
      <div
        className="
          flex items-center justify-center
          backdrop-blur-sm bg-[#25213C]/90
          border-b border-gray-700/30
          relative
        "
      >
        <div className="relative flex w-full max-w-4xl mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              label={item.label}
              isActive={isNavItemActive(item)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};
