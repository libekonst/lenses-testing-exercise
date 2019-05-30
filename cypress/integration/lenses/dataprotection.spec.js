describe.only("Data Protection", () => {
  beforeEach(() => {
    cy.login();
    cy.get(".navbar", { timeout: 10000 }).should("exist");
  });

  context("Navigation", () => {
    it("Navigates to the Policies page", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]')
        .should("contain", "POLICIES")
        .click();
      cy.get("#dataProtectionContainer").should("exist");
      cy.get('button[class="btn btn-secondary btn-secondary-lenses"]').should(
        "contain",
        "New policy"
      );
      cy.url().should("include", "dataprotection/policies");
    });

    it("Loads the default policies", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]')
        .should("contain", "POLICIES")
        .click();
      cy.get(".overview-policy-screen thead tr th").should("contain", "Policy");
      cy.get(".overview-policy-screen tbody tr").should("exist");
    });
  });

  context("Creation", () => {
    it("Creates a new policy", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]')
        .should("contain", "POLICIES")
        .click();
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

      // Issue another command to wait until the request is finished before ending the test.
      cy.get("button");
    });

    it("Finds the new test policy", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]')
        .should("contain", "POLICIES")
        .click();
      cy.get(".table-search input").type("TestLenses", { force: true });
      cy.get("tr")
        .contains("TestLenses")
        .should("exist");
    });

    it("Deletes the test policy", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]')
        .should("contain", "POLICIES")
        .click();
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

      // Issue another command to wait until the request is finished before ending the test.
      cy.get("button");
    });

    it("Confirms that the test policy is deleted", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]')
        .should("contain", "POLICIES")
        .click();
      cy.get(".table-search input").type("TestLenses", { force: true });
      cy.get("tr")
        .contains("TestLenses")
        .should("not.exist");
    });
  });
});
