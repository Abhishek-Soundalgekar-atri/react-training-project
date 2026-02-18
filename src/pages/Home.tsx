import { useMemo } from "react";
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
  loading: boolean;
  error: string | null;
}

export default function Home({ pizzas, deletePizza, loading, error }: HomeProps) {
  const columns = useMemo<ColumnDef<Pizza>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: ({ row }) => (
          <Link to={`/${row.original.id}`}>{row.original.id}</Link>
        ),
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
          <button onClick={() => deletePizza(row.original.id)}>
            Delete
          </button>
        ),
      },
    ],
    [deletePizza]
  );

  const table = useReactTable({
    data: pizzas, // ✅ USE PROP, NOT MOCK DATA
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Pizza Menu</h1>

      <table border={1} cellPadding={10}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} data-testid="pizza-row">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}