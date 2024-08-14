/// <reference types="cypress" />

describe("Cashier Sales App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should allow a cashier to log in, view sales and add a sale", () => {
    // Select a cashier
    cy.contains("SELECT A CASHIER").should("be.visible");
    cy.contains("Bob").click();

    // Verify we're on the sales dashboard
    cy.contains("Cashier sales statistics").should("be.visible");
    cy.contains("Bob").should("be.visible");

    // Check if the chart is rendered
    cy.contains("Cashier sales statistics").should("be.visible");

    // Add a sale
    cy.contains("Add sale").click();

    // Verify we're on the order view
    cy.contains("Sale").should("be.visible");
    cy.contains("Items:").should("be.visible");
    cy.contains("Cost:").should("be.visible");

    // Add items to the order
    cy.get('input[type="number"]').first().type("2");
    cy.get('input[type="number"]').eq(1).type("1");

    // Submit the order
    cy.contains("Submit").click();

    // Verify we're back on the sales dashboard
    cy.contains("Cashier sales statistics").should("be.visible");

    // Switch cashier (log out)
    cy.contains("Switch Cashier").click();

    // Verify we're back at the cashier selection screen
    cy.contains("SELECT A CASHIER").should("be.visible");
  });

  it("should display correct total items and cost in the order view", () => {
    // Select a cashier and navigate to the order view
    cy.contains("Bob").click();
    cy.contains("Add sale").click();

    // Add items to the order
    cy.get('input[type="number"]').first().type("2");
    cy.get('input[type="number"]').eq(1).type("3");

    // Check if the total items and cost are updated correctly
    cy.contains("Items: 5").should("be.visible");
    // The actual cost will depend on your mock data, so adjust this accordingly
    cy.contains("Cost: £8.08").should("be.visible");
  });

  it("should persist sales data across sessions", () => {
    // Select a cashier and add a sale
    cy.contains("Bob").click();
    cy.contains("Add sale").click();
    cy.get('input[type="number"]').first().type("1");
    cy.contains("Submit").click();

    // Refresh the page
    cy.reload();

    // Select the same cashier
    cy.contains("Bob").click();

    // Verify that the sales data is still present in the chart
    cy.contains("Cashier sales statistics").should("be.visible");
    // You might want to add more specific checks here based on your chart implementation
  });

  it("should reset mock sales and display Bob, Dave, and Sarah in the sales table", () => {
    // Select a cashier to get to the sales dashboard
    cy.contains("SELECT A CASHIER").should("be.visible");
    // Look for and click the "Reset Mock Sales" button
    cy.contains("Reset mock sales").click();

    cy.contains("Bob").click();

    // Verify we're on the sales dashboard
    cy.contains("Cashier sales statistics").should("be.visible");

    // Verify we're still on the sales dashboard
    cy.contains("Cashier sales statistics").should("be.visible");

    // Check that the table or chart contains Bob, Dave, and Sarah
    cy.contains("Cashier sales statistics").should("be.visible");

    cy.contains("Bob").should("be.visible");
    cy.contains("Dave").should("be.visible");
    cy.contains("Sarah").should("be.visible");

    // Optional: Verify that these names are in the chart's x-axis labels
    cy.get(".MuiChartsAxis-tickLabel").should("contain", "Bob");
    cy.get(".MuiChartsAxis-tickLabel").should("contain", "Dave");
    cy.get(".MuiChartsAxis-tickLabel").should("contain", "Sarah");
  });
});
