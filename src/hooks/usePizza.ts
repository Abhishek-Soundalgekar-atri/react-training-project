import { useState } from "react";
import type { Pizza } from "../types/Pizza";

export function usePizza() {
  const [pizzas, setPizzas] = useState<Pizza[]>([
    {
      id: 1,
      name: "Margherita",
      toppings: ["Cheese"],
      fanFavorite: true,
      delivery: true,
    },
    {
      id: 2,
      name: "Pepperoni",
      toppings: ["Cheese", "Pepperoni"],
      fanFavorite: true,
      delivery: false,
    },
    {
      id: 3,
      name: "Veggie",
      toppings: ["Peppers", "Onions", "Olives"],
      fanFavorite: false,
      delivery: true,
    },
  ]);

  const addPizza = (newPizza: Omit<Pizza, "id">) => {
    setPizzas((prev) => [
      ...prev,
      { id: prev.length + 1, ...newPizza },
    ]);
  };

  const updatePizza = (updatedPizza: Pizza) => {
    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza.id === updatedPizza.id ? updatedPizza : pizza
      )
    );
  };

  const deletePizza = (id: number) => {
    setPizzas((prev) =>
      prev.filter((pizza) => pizza.id !== id)
    );
  };

  return {
    pizzas,
    addPizza,
    updatePizza,
    deletePizza,
  };
}