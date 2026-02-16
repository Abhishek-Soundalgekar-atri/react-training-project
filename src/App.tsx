import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddPizza from "./pages/AddPizza";
import EditPizza from "./pages/EditPizza";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/add-pizza">Add Pizza</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-pizza" element={<AddPizza />} />
        <Route path="/:pizzaId" element={<EditPizza />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;