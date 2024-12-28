describe('visual test', () => {
  it('should match snapshot', () => {
    cy.visit('/')
    cy.wait(100)
    cy.percySnapshot('first')
    cy.wait(400)
    cy.percySnapshot('second')
    cy.wait(500)
    cy.percySnapshot('third')
  })
})