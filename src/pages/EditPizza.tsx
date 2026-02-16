import { useParams } from "react-router-dom";

export default function EditPizza() {
  const { pizzaId } = useParams();

  return <h1>Edit Pizza Page - {pizzaId}</h1>;
}