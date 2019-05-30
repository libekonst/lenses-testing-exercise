describe.only("Data Protection", () => {
  beforeEach(() => {
    cy.login();
    cy.get(".navbar", { timeout: 10000 }).should("exist");
    // Navigate to the policies route.
    cy.toPolicies();
  });

  context("Navigation", () => {
    it("Navigates to the Policies page", () => {
      // Assert the route is appropriate.
      cy.url().should("include", "dataprotection/policies");

      // Assert that a policies container is present.
      cy.get("#dataProtectionContainer").should("exist");
    });

    it("Loads the default policies", () => {
      const btnClassName = "'btn btn-secondary btn-secondary-lenses'";

      // If the Load Default Policies button is present, click it to load the policies.
      cy.get(`button[class=${btnClassName}]`).then(
        $btn => $btn.text().includes("Load Default Policies") && $btn.click()
      );

      // Assert that a policies table exists.
      cy.get(".overview-policy-screen thead tr th").should("contain", "Policy");
      // Assert that there is at least one policy row in the table.
      cy.get(".overview-policy-screen tbody tr").should("exist");

      // Assert that a New Policy button exists.
      cy.get(`button[class=${btnClassName}]`).should("contain", "New policy");
    });
  });

  context("Creation", () => {
    it("Creates a new policy", () => {
      // cy.get('.navbar a[href="/dataprotection/policies"]')
      //   .should("contain", "POLICIES")
      //   .click();
      cy.get(".overview-policy-screen button")
        .contains("New policy")
        .click();
      cy.get("input#name").type("TestLenses");
      cy.get("select#obfuscation").select("All");
      cy.get("select#impactType").select("HIGH");
      // cy.get(".lenses-creatable-autocomplete__indicators").click();
      // cy.get("#react-select-4-option-3").click();
      // cy.get("#category").focus();
      cy.get("#react-select-2-input").type("PII{enter}", { force: true });
      cy.get(".react-tagsinput-input input").type("test-tag{enter}");
      cy.get("button.btn-policy").click();

      // Cypress awaits for async processes to finish before proceeding to other commands.
      // Issue another command to wait until the request is finished before ending the test.
      cy.get("div");
    });

    it("Finds the new test policy", () => {
      // cy.get('.navbar a[href="/dataprotection/policies"]')
      //   .should("contain", "POLICIES")
      //   .click();
      cy.get(".table-search input").type("TestLenses", { force: true });
      cy.get("tr")
        .contains("TestLenses")
        .should("exist");
    });

    it("Deletes the test policy", () => {
      // cy.get('.navbar a[href="/dataprotection/policies"]')
      //   .should("contain", "POLICIES")
      //   .click();
      cy.get(".table-search input").type("TestLenses", { force: true });
      cy.get("tr")
        .contains("TestLenses")
        .should("exist");
      cy.get("a.text-danger").click();
      cy.get(".modal-body").contains("TestLenses");
      cy.get(".modal-body").contains("will be deleted");
      cy.get("button")
        .contains("Delete")
        .click();

      // Cypress awaits for async processes to finish before proceeding to other commands.
      // Issue another command to wait until the request is finished before ending the test.
      cy.get("div");
    });

    it("Confirms that the test policy is deleted", () => {
      // cy.get('.navbar a[href="/dataprotection/policies"]')
      //   .should("contain", "POLICIES")
      //   .click();
      cy.get(".table-search input").type("TestLenses", { force: true });
      cy.get("tr")
        .contains("TestLenses")
        .should("not.exist");
    });
  });
});
