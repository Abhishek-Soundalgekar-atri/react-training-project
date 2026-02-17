import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { Link } from "react-router-dom";
import type { Pizza } from "../types/Pizza";

export default function Home() {
  const data: Pizza[] = useMemo(
    () => [
      {
        id: 1,
        name: "Margherita",
        toppings: ["Cheese"],
        fanFavorite: true,
        delivery: true,
      },
      {
        id: 2,
        name: "Pepperoni",
        toppings: ["Cheese", "Pepperoni"],
        fanFavorite: true,
        delivery: false,
      },
      {
        id: 3,
        name: "Veggie",
        toppings: ["Peppers", "Onions", "Olives"],
        fanFavorite: false,
        delivery: true,
      },
    ],
    []
  );

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
          <button onClick={() => alert(`Delete ${row.original.name}`)}>
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
            <tr key={row.id}>
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