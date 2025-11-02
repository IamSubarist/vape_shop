import React, { useState, useEffect } from "react";
import { Showcase } from "../../components/Showcase/Showcase";
import { api } from "../../utils/api";

export const Liquids = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await api.getAllCategories("liquids");
        setCategories(categoriesData);
      } catch (err) {
        setError("Не удалось загрузить категории");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400">Загрузка категорий...</p>
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
      <Showcase title="Жидкости" dataUrl={categories} type="liquids" isCategory={true} />
    </div>
  );
};
