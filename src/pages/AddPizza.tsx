import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface AddPizzaProps {
  addPizza: (pizza: {
    name: string;
    toppings: string[];
    fanFavorite: boolean;
    delivery: boolean;
  }) => void;
}

interface AddPizzaFormData {
  name: string;
  toppings: string[];
  fanFavorite: string;
  delivery: string;
}

export default function AddPizza({ addPizza }: AddPizzaProps) {
  const { register, handleSubmit } = useForm<AddPizzaFormData>();
  const navigate = useNavigate();

  const onSubmit = (data: AddPizzaFormData) => {
    addPizza({
      name: data.name,
      toppings: data.toppings || [],
      fanFavorite: data.fanFavorite === "true",
      delivery: data.delivery === "true",
    });

    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add Pizza</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="name">Pizza Name:</label>
          <input
            id="name"
            {...register("name")}
            name="name"
            required
          />
        </div>

        <div>
          <label>Toppings:</label>
          {["Cheese", "Pepperoni", "Onions", "Olives"].map((topping) => (
            <label key={topping}>
              <input
                type="checkbox"
                value={topping}
                {...register("toppings")}
                name="toppings"
              />
              {topping}
            </label>
          ))}
        </div>

        <div>
          <label>Fan Favorite:</label>
          <label>
            <input
              type="radio"
              value="true"
              {...register("fanFavorite")}
              name="fanFavorite"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              {...register("fanFavorite")}
              name="fanFavorite"
            />
            No
          </label>
        </div>

        <div>
          <label htmlFor="delivery">Delivery:</label>
          <select id="delivery" {...register("delivery")} name="delivery">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button type="submit" data-testid="submit-pizza">
          Add Pizza
        </button>

      </form>
    </div>
  );
}