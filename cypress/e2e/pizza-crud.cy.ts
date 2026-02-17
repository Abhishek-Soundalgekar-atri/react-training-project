describe("Pizza CRUD Application", () => {

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

});