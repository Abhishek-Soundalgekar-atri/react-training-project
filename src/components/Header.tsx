import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-red-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-semibold">
        React Training Project - Abhishek Soundalgekar
      </div>

      <nav className="space-x-6">
        <Link to="/" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/pizzas" className="hover:underline">
          Pizzas
        </Link>
        <Link to="/add-pizza" className="hover:underline">
          Add Pizza
        </Link>
      </nav>
    </header>
  );
}