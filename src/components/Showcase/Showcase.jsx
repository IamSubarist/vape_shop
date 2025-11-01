import React from "react";

export const Showcase = ({ title, dataUrl, type = "liquids" }) => {
  const getItemInfo = (item) => {
    if (type === "liquids") {
      return {
        title: item.title,
        taste: item.taste,
        volume: item.volume,
        nicotine: item.nicotine,
        price: item.price,
        image: item.image,
      };
    }
    if (type === "cartridges") {
      return {
        title: item.title,
        taste: item.taste,
        volume: item.volume,
        nicotine: item.nicotine,
        price: item.price,
        image: item.image,
      };
    }
    if (type === "pods") {
      return {
        title: item.title,
        taste: item.taste,
        price: item.price,
        puffs: item.puffs,
        image: item.image,
      };
    }
  };
  return (
    <div>
      <p
        className="text-[32px] font-bold text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
        }}
      >
        {title}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {type === "liquids"
          ? dataUrl.map((item) => (
              <div key={item.id}>
                <img
                  src={getItemInfo(item).image}
                  alt={getItemInfo(item).title}
                />
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[18px] font-bold text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
                    }}
                  >
                    {getItemInfo(item).title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Вкус: {getItemInfo(item).taste}
                  </p>
                  <p className="text-sm text-gray-500">
                    Объем: {getItemInfo(item).volume}
                  </p>
                  <p className="text-sm text-gray-500">
                    Крепость: {getItemInfo(item).nicotine}
                  </p>
                  <p className="text-sm text-gray-500">
                    Цена: {Number(getItemInfo(item).price).toLocaleString()}₽
                  </p>
                </div>
              </div>
            ))
          : type === "cartridges"
          ? dataUrl.map((item) => (
              <div key={item.id}>
                <img
                  src={getItemInfo(item).image}
                  alt={getItemInfo(item).title}
                />
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[18px] font-bold text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
                    }}
                  >
                    {getItemInfo(item).title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Цена: {Number(getItemInfo(item).price).toLocaleString()}₽
                  </p>
                </div>
              </div>
            ))
          : type === "pods"
          ? dataUrl.map((item) => (
              <div key={item.id}>
                <img
                  src={getItemInfo(item).image}
                  alt={getItemInfo(item).title}
                />
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[18px] font-bold text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
                    }}
                  >
                    {getItemInfo(item).title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Вкус: {getItemInfo(item).taste}
                  </p>
                  <p className="text-sm text-gray-500">
                    Кол-во затяжек:{" "}
                    {Number(getItemInfo(item).puffs).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Цена: {Number(getItemInfo(item).price).toLocaleString()}₽
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
