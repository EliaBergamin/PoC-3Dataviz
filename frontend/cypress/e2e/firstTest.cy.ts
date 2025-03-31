/* describe("default 3D env test", () => {
  it("should display default elements", () => {
    cy.visit("/");
    cy.wait(200);
    cy.get('[data-cy="cy-canvas"]')
      .should("be.visible")
      .and("have.css", "width", "600px")
      .and("have.css", "height", "600px");
  }),
    it('should match snapshots', () => {
      cy.visit('/')
      cy.wait(500)
      cy.percySnapshot('first')
      cy.wait(500)
      cy.percySnapshot('second')
      cy.get('[data-cy="cy-canvas"]')
        .percySnapshotElement('canvas')
    }),
    it("should rotate when clicking Gizmo", () => {
      cy.visit("/");
      cy.wait(200);
      cy.get('[data-cy="cy-canvas"]')
        .should("be.visible")
        .percySnapshotElement("initial-canvas");
      cy.get('[data-cy="cy-canvas"]')
        .click(50, 100)
        .wait(1000)
        .should("be.visible")
        .screenshot("rotated-canvas");
      cy.get("canvas")
        .trigger("mousedown", { which: 1, clientX: 500, clientY: 200 })
        .trigger("mousemove", { which: 1, clientX: 580, clientY: 280 })
        .trigger("mouseup");
      cy.get('[data-cy="cy-canvas"]')
        .should("be.visible")
        .screenshot("2-rotated-canvas");
    });
});
 */
