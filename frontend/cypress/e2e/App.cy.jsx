describe('Routing Tests with Mocked Data', () => {
  it('Visits Home Page', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('NavBar returns to homepage', () => {
    cy.visit('http://localhost:5173/D-Block/D202');
    cy.contains('a', 'Home').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('Visits Room D201 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="D201"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D201');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });

  it('Visits Room D202 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="D202"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D202');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });

  it('Visits Room D207 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="D207"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D207');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });
});