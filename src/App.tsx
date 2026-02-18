import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddPizza from "./pages/AddPizza";
import EditPizza from "./pages/EditPizza";
import { usePizza } from "./hooks/usePizza";

function App() {
  const {
  pizzas,
  addPizza,
  updatePizza,
  deletePizza,
  loading,
  error,
} = usePizza();

  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/add-pizza">Add Pizza</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              pizzas={pizzas}
              deletePizza={deletePizza}
              loading={loading}
              error={error}
/>
          }
        />

        <Route
          path="/add-pizza"
          element={
            <AddPizza
              addPizza={addPizza}
            />
          }
        />

        <Route
          path="/:pizzaId"
          element={
            <EditPizza
              pizzas={pizzas}
              updatePizza={updatePizza}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;