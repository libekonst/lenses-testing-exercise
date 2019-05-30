Cypress.Commands.add("login", () => {
  Cypress.log({
    name: "Login",
    message: Cypress.env("username") + " | " + Cypress.env("password")
  });

  cy.visit("/login.html");
  cy.get("input[name=user]").type(Cypress.env("username"));
  cy.get("input[name=pass]").type(Cypress.env("password") + "{enter}");
});

Cypress.Commands.add("toPolicies", () => {
  Cypress.log({
    name: "Policies route",
    message: "Navigate to the Policies route"
  });

  cy.get('.navbar a[href="/dataprotection/policies"]')
    .should("contain", "POLICIES")
    .click();
});
