import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AddPizza from "./AddPizza";
import { expect, test, vi } from "vitest";

test("calls addPizza with correct data on submit", async () => {
const mockAddPizza = vi.fn();

render(
    <MemoryRouter>
    <AddPizza addPizza={mockAddPizza} />
    </MemoryRouter>
);

const user = userEvent.setup();

await user.type(screen.getByLabelText(/Pizza Name/i), "TestPizza");

await user.click(screen.getByLabelText(/Cheese/i));

await user.click(screen.getByLabelText(/Yes/i)); // Fan Favorite

await user.selectOptions(
    screen.getByLabelText(/Delivery/i),
    "true"
);

await user.click(screen.getByRole("button", { name: /Add Pizza/i }));

expect(mockAddPizza).toHaveBeenCalledTimes(1);

expect(mockAddPizza).toHaveBeenCalledWith({
    name: "TestPizza",
    toppings: ["Cheese"],
    fanFavorite: true,
    delivery: true,
});
});