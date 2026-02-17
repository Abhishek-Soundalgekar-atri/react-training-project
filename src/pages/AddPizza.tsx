import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface AddPizzaFormData 
{
  name: string;
  toppings: string[];
  fanFavorite: string;
  delivery: string;
}

export default function AddPizza() 
{
  const { register, handleSubmit } = useForm<AddPizzaFormData>();
  const navigate = useNavigate();

  const onSubmit = (data: AddPizzaFormData) => {
    console.log("Form Submitted:", data);

    // temporary redirect
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add Pizza</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Pizza Name */}
        <div>
          <label>Pizza Name:</label>
          <input {...register("name")} required />
        </div>

        {/* Toppings */}
        <div>
          <label>Toppings:</label>
          <div>
            <label>
              <input type="checkbox" value="Cheese" {...register("toppings")} />
              Cheese
            </label>
            <label>
              <input type="checkbox" value="Pepperoni" {...register("toppings")} />
              Pepperoni
            </label>
            <label>
              <input type="checkbox" value="Onions" {...register("toppings")} />
              Onions
            </label>
            <label>
              <input type="checkbox" value="Olives" {...register("toppings")} />
              Olives
            </label>
          </div>
        </div>

        {/* Fan Favorite */}
        <div>
          <label>Fan Favorite:</label>
          <label>
            <input type="radio" value="true" {...register("fanFavorite")} />
            Yes
          </label>
          <label>
            <input type="radio" value="false" {...register("fanFavorite")} />
            No
          </label>
        </div>

        {/* Delivery */}
        <div>
          <label>Available for Delivery:</label>
          <select {...register("delivery")}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button type="submit">Add Pizza</button>

      </form>
    </div>
  );
}
