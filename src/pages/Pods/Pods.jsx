import React from "react";
import { Showcase } from "../../components/Showcase/Showcase";

export const Pods = () => {
  const mockItems = [
    {
      id: 1,
      title: "GHOST SHISHA 15000💨",
      taste: "Черника малина🫐🍓",
      price: "800",
      puffs: "15000",
      image: "https://placehold.co/600x400",
    },
    {
      id: 2,
      title: "GHOST SHISHA 15000💨",
      taste: "Персик лед🍑🧊",
      price: "800",
      puffs: "15000",
      image: "https://placehold.co/600x400",
    },
    {
      id: 3,
      title: "WAKA soPro 28000💨",
      taste: "Blue razz mint🍵",
      price: "1150",
      puffs: "28000",
      image: "https://placehold.co/600x400",
    },
    {
      id: 3,
      title: "WAKA soPro 28000💨",
      taste: "Raspberry Cola🍓🥤",
      price: "1150",
      puffs: "28000",
      image: "https://placehold.co/600x400",
    },
  ];
  return (
    <div>
      <Showcase title="Устройства" dataUrl={mockItems} type="pods" />
    </div>
  );
};
