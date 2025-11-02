import React, { useState, useEffect } from "react";
import { Showcase } from "../../components/Showcase/Showcase";
import { api } from "../../utils/api";

export const Pods = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await api.getProductsByCategory("pods");
        // Преобразуем price из числа в строку для совместимости с компонентом
        const formattedProducts = products.map((product) => ({
          ...product,
          price: product.price.toString(),
          puffs: product.puffs ? product.puffs.toString() : null,
        }));
        setItems(formattedProducts);
      } catch (err) {
        setError("Не удалось загрузить товары");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <div>
      <Showcase title="Устройства" dataUrl={items} type="pods" />
    </div>
  );
};
