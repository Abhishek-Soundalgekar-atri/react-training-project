// src/pages/Dashboard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, PlusCircle, Settings } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">React Training Project - Abhishek Soundalgekar</div>
          <nav className="space-x-6">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/pizzas" className="hover:underline">Pizzas</Link>
            <Link to="/add-pizza" className="hover:underline">Add Pizza</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-red-700 to-red-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Welcome to the Pizza Dashboard! 🍕
          </h1>

          <div className="max-w-2xl mx-auto">
            <input
              placeholder="Search pizzas... (decorative)"
              className="w-full rounded-xl px-5 py-4 text-gray-700 bg-white shadow-md focus:outline-none"
              aria-label="dashboard-search"
              readOnly
            />
            <p className="text-sm text-white/80 mt-3">
              (Search on dashboard is decorative — go to Pizzas to search pizza entries.)
            </p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/pizzas" className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition">
            <ShoppingCart className="mb-4 text-red-700 w-8 h-8" />
            <h3 className="text-lg font-semibold mb-1">Browse Pizzas</h3>
            <p className="text-sm text-gray-600">View and manage pizza entries.</p>
          </Link>

          <Link to="/add-pizza" className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition">
            <PlusCircle className="mb-4 text-red-700 w-8 h-8" />
            <h3 className="text-lg font-semibold mb-1">Add Pizza</h3>
            <p className="text-sm text-gray-600">Create a new pizza entry.</p>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <Settings className="mb-4 text-red-700 w-8 h-8" />
            <h3 className="text-lg font-semibold mb-1">Manage Settings</h3>
            <p className="text-sm text-gray-600">Future configuration area.</p>
          </div>
        </div>
      </section>
    </div>
  );
}