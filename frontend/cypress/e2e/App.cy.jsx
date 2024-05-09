describe('template spec', () => {
  it('Visits Home Page', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('have.text','Welcome to D-Block CO2 Monitor')
    // cy.get('[data-cy="D201"]').click()
  })
  it('Visits Room D201', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="D201"]').click()
  })
})