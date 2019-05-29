describe.only("Data Protection", () => {
  beforeEach(() => {
    cy.login();
    cy.get(".navbar", { timeout: 10000 }).should("exist");
  });

  context("Creation", () => {
    it("I can navigate to the Policies page", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]')
        .should("contain", "POLICIES")
        .click();
      cy.get("#dataProtectionContainer").should("exist");
      cy.get('button[class="btn btn-secondary btn-secondary-lenses"]').should(
        "contain",
        "New policy"
      );
    });
  });
});
