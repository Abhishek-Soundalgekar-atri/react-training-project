import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import type { Pizza } from "../types/Pizza";

interface HomeProps {
  pizzas: Pizza[];
  deletePizza: (id: number) => void;
  // (loading / error optional if you use a backend)
  loading?: boolean;
  error?: string | null;
}

export default function Home({ pizzas, deletePizza }: HomeProps) {
  const [search, setSearch] = useState("");

  const columns = useMemo<ColumnDef<Pizza>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: ({ row }) => <Link to={`/${row.original.id}`}>{row.original.id}</Link>,
      },
      {
        header: "Pizza",
        accessorKey: "name",
      },
      {
        header: "Toppings",
        accessorKey: "toppings",
        cell: ({ row }) => row.original.toppings.join(", "),
      },
      {
        header: "Fan Favorite",
        accessorKey: "fanFavorite",
        cell: ({ row }) => (row.original.fanFavorite ? "Yes" : "No"),
      },
      {
        header: "Delivery",
        accessorKey: "delivery",
        cell: ({ row }) => (row.original.delivery ? "Yes" : "No"),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() => {
              if (confirm(`Delete "${row.original.name}"?`)) {
                deletePizza(row.original.id);
              }
            }}
            className="px-3 py-1 rounded bg-gray-800 text-white"
          >
            Delete
          </button>
        ),
      },
    ],
    [deletePizza]
  );

  // filter based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return pizzas;
    const s = search.toLowerCase();
    return pizzas.filter((p) => p.name.toLowerCase().includes(s) || p.toppings.join(", ").toLowerCase().includes(s));
  }, [pizzas, search]);

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Pizza Menu</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search pizzas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="border px-3 py-2 text-left bg-gray-100">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border px-3 py-3 align-top">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="mt-6 text-gray-600">No pizzas match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}