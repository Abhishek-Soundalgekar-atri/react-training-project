describe("Pizza CRUD Application", () => {

it("should allow adding a new pizza", () => {
  cy.intercept("POST", "http://localhost:3001/pizzas").as("addPizza");

  cy.visit("/");

  cy.contains("Add Pizza").click();

  cy.get('input[name="name"]').type("TestPizza");

  cy.get('input[type="checkbox"][value="Cheese"]').check();

  cy.get('input[type="radio"][value="true"]').check();

  cy.get('select[name="delivery"]').select("true");

  cy.get('[data-testid="submit-pizza"]').click();

  cy.wait("@addPizza");

  cy.contains("TestPizza").should("be.visible");
});

  it("should display the list of pizzas", () => {
    cy.visit("/");

    cy.contains("Pizza Menu");

    cy.contains("ID");
    cy.contains("Pizza");
    cy.contains("Toppings");
    cy.contains("Fan Favorite");
    cy.contains("Delivery");

    cy.contains("Margherita");
    cy.contains("Pepperoni");
    cy.contains("Veggie");
  });

it("should allow deleting a pizza", () => {
  cy.intercept("DELETE", "http://localhost:3001/pizzas/*").as("deletePizza");

  cy.visit("/");

  cy.contains("Margherita")
    .parent()
    .within(() => {
      cy.contains("Delete").click();
    });

  cy.wait("@deletePizza");

  cy.contains("Margherita").should("not.exist");
});

it("should allow editing a pizza", () => {
  cy.intercept("PUT", "http://localhost:3001/pizzas/*").as("updatePizza");

  cy.visit("/");

  cy.contains("1").click();

  cy.get('input[name="name"]')
    .clear()
    .type("UpdatedPizza");

  cy.contains("Update Pizza").click();

  cy.wait("@updatePizza");

  cy.contains("UpdatedPizza").should("exist");
});

});