"use client";

import { useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    const saved = localStorage.getItem("favorites");
    return saved ? (JSON.parse(saved) as string[]) : [];
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  return { favorites, toggleFavorite };
}
