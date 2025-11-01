import React from "react";
import { Showcase } from "../../components/Showcase/Showcase";

export const Cartridges = () => {
  const mockItems = [
    {
      id: 1,
      title: "Испаритель К-1 на Pasito 2💨",
      price: "220",
      image: "https://placehold.co/600x360",
    },
  ];
  return (
    <div>
      <Showcase title="Катриджи" dataUrl={mockItems} type="cartridges" />
    </div>
  );
};
