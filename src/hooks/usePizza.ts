import { useEffect, useState } from "react";
import axios from "axios";
import type { Pizza } from "../types/Pizza";

const API_URL = "http://localhost:3001/pizzas";

export function usePizza() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setPizzas(res.data);
    } catch (err) {
      setError("Failed to load pizzas");
    } finally {
      setLoading(false);
    }
  };

  const addPizza = async (newPizza: Omit<Pizza, "id">) => {
    const res = await axios.post(API_URL, newPizza);
    setPizzas((prev) => [...prev, res.data]);
  };

  const updatePizza = async (updatedPizza: Pizza) => {
    await axios.put(`${API_URL}/${updatedPizza.id}`, updatedPizza);
    setPizzas((prev) =>
      prev.map((p) =>
        p.id === updatedPizza.id ? updatedPizza : p
      )
    );
  };

  const deletePizza = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    setPizzas((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  return {
    pizzas,
    addPizza,
    updatePizza,
    deletePizza,
    loading,
    error,
  };
}