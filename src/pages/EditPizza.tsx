import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { Pizza } from "../types/Pizza";

interface EditPizzaProps {
  pizzas: Pizza[];
  updatePizza: (pizza: Pizza) => void;
}

interface EditPizzaFormData {
  name: string;
  toppings: string[];
  fanFavorite: string;
  delivery: string;
}

export default function EditPizza({
  pizzas,
  updatePizza,
}: EditPizzaProps) {
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  const pizza = pizzas.find(
    (p) => p.id === Number(pizzaId)
  );

  if (!pizza) {
    return <h2>Pizza not found</h2>;
  }

  const { register, handleSubmit } = useForm<EditPizzaFormData>({
    defaultValues: {
      name: pizza.name,
      toppings: pizza.toppings,
      fanFavorite: String(pizza.fanFavorite),
      delivery: String(pizza.delivery),
    },
  });

  const onSubmit = (data: EditPizzaFormData) => {
    updatePizza({
      id: pizza.id,
      name: data.name,
      toppings: data.toppings || [],
      fanFavorite: data.fanFavorite === "true",
      delivery: data.delivery === "true",
    });

    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Edit Pizza</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Name */}
        <div>
          <label>Pizza Name:</label>
          <input {...register("name")} required />
        </div>

        {/* Toppings */}
        <div>
          <label>Toppings:</label>
          <div>
            {["Cheese", "Pepperoni", "Onions", "Olives"].map(
              (topping) => (
                <label key={topping}>
                  <input
                    type="checkbox"
                    value={topping}
                    {...register("toppings")}
                    defaultChecked={pizza.toppings.includes(
                      topping
                    )}
                  />
                  {topping}
                </label>
              )
            )}
          </div>
        </div>

        {/* Fan Favorite */}
        <div>
          <label>Fan Favorite:</label>
          <label>
            <input
              type="radio"
              value="true"
              {...register("fanFavorite")}
              defaultChecked={pizza.fanFavorite === true}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              {...register("fanFavorite")}
              defaultChecked={pizza.fanFavorite === false}
            />
            No
          </label>
        </div>

        {/* Delivery */}
        <div>
          <label>Available for Delivery:</label>
          <select
            {...register("delivery")}
            defaultValue={String(pizza.delivery)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button type="submit">Update Pizza</button>
      </form>
    </div>
  );
}