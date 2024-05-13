describe('Homepage spec', () => {
  it('Visits Home Page', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('have.text','Welcome to D-Block CO2 Monitor')
  })
  it('Visits Room D201', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="D201"]').click()
    cy.url().should('eq', 'http://localhost:5173/room/D201')
  })
  it('Visits Room D202', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="D202"]').click()
    cy.url().should('eq', 'http://localhost:5173/room/D202')
  })
  it('Visits Room D207', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="D207"]').click()
    cy.url().should('eq', 'http://localhost:5173/room/D207')
  })
  it('Visits Room D207 TD', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="D207B"]').click()
    cy.url().should('eq', 'http://localhost:5173/room/D207%20TD')
  })
  it('Visits Sensor History', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="SensorHistory"]').click()
    cy.url().should('eq', 'http://localhost:5173/SensorHistory')
  })
})