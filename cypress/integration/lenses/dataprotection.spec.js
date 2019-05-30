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
    // Tries to find a remnant test policy from a previous test run
    // and deletes it, to provide a clean start for the 'create new' test.
    it("Cleans up after previous test runs", () => {
      // Try to find a remaining test policy.
      cy.get(".table-search input").type("TestLenses", { force: true });

      // If found, delete it.
      cy.get("tr").then($row => {
        if ($row.text().includes("TestLenses")) {
          // Open the delete dialog.
          cy.get("tr a.text-danger").click();

          // Confirm that the test policy is about to be deleted.
          cy.get(".modal-body").contains("TestLenses");
          cy.get(".modal-body").contains("will be deleted");

          // Delete.
          cy.get("button")
            .contains("Delete")
            .click();
        }
      });
    });

    it("Creates a new policy", () => {
      // Attempt to open the new policy form.
      cy.get(".overview-policy-screen button")
        .contains("New policy")
        .click();

      // Fill in the fields.
      cy.get("input#name").type("TestLenses");
      cy.get("select#obfuscation").select("All");
      cy.get("select#impactType").select("HIGH");
      cy.get("#react-select-2-input").type("PII{enter}", { force: true });
      cy.get(".react-tagsinput-input input").type("test-tag{enter}");

      // Submit.
      cy.get("button.btn-policy").click();

      // Cypress awaits for async processes to finish before proceeding to other commands.
      // Issue the wait command to wait for the modal to close and be able to type in the search field.
      cy.wait(1000);

      // Search for the test policy.
      cy.get(".table-search input").type("TestLenses", { force: true });

      // Assert that it exists.
      cy.get("tr")
        .contains("TestLenses")
        .should("exist");
    });

    it("Deletes the test policy", () => {
      // Find the test policy.
      cy.get(".table-search input").type("TestLenses", { force: true });
      cy.get("tr")
        .contains("TestLenses")
        .should("exist");

      // Open the delete dialog.
      cy.get("tr a.text-danger").click();

      // Confirm that the test policy is about to be deleted.
      cy.get(".modal-body").contains("TestLenses");
      cy.get(".modal-body").contains("will be deleted");

      // Delete.
      cy.get("button")
        .contains("Delete")
        .click();

      // Cypress awaits for async processes to finish before proceeding to other commands.
      // Issue the wait command to wait for the modal to close and be able to type in the search field.
      cy.wait(1000);

      // Search for the deleted policy.
      cy.get(".table-search input").type("TestLenses", { force: true });

      // Assert it was deleted.
      cy.get("tr")
        .contains("TestLenses")
        .should("not.exist");
    });
  });
});
