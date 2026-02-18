import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import Home from "./Home";
import type { Pizza } from "../types/Pizza";

const mockPizzas: Pizza[] = [
{
    id: 1,
    name: "TestPizza",
    toppings: ["Cheese"],
    fanFavorite: true,
    delivery: true,
},
];

test("renders pizza table with data", () => {
render(
    <MemoryRouter>
    <Home
        pizzas={mockPizzas}
        deletePizza={() => {}}
        loading={false}
        error={null}
/>
</MemoryRouter>
);

expect(screen.getByText("Pizza Menu")).toBeInTheDocument();
expect(screen.getByText("TestPizza")).toBeInTheDocument();
});