describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    // The edit button is only revealed when we hover over the appointment. When we try and click on it, it will start "waiting for actionability". We want to use the click arguments to force the action and disable "waiting for actionability".

    cy.get("[alt=Edit]").first().click({ force: true });

    // The interviewer we want to select this time is "Tori Malcolm".

    cy.get('[alt="Tori Malcolm"]').click();
    // We can clear the input field before we type in it.
    cy.get("[data-testid=student-name-input]").type("{selectall}{backspace}");
    //change name and save
    cy.get("[data-testid=student-name-input]").type("Hugo Palomera");
    cy.contains("Save").click();
    // check new appointment
    cy.contains(".appointment__card--show", "Hugo Palomera");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
