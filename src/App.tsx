import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
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
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/pizzas"
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
          element={<AddPizza addPizza={addPizza} />}
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