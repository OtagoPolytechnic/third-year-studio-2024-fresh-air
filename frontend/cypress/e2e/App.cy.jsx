describe('Routing Tests with Mocked Data', () => {
  beforeEach(() => {
    // Load mocked device data before each test
    cy.fixture('mockedData').as('mockedData');
    
    // Load room data for different rooms
    cy.fixture('roomData201').as('roomDataD201');
    cy.fixture('roomData202').as('roomDataD202');
    cy.fixture('roomData207').as('roomDataD207');
    
    // Intercept the network request to your backend API with mocked data
    cy.intercept('GET', '**/api/v1/devices', {
      statusCode: 200,
      body: '@mockedData'
    }).as('getSensorData');

    cy.intercept('GET', '**/api/v1/rooms/latest/1000024b080301f5', {
      statusCode: 200,
      body: '@roomDataD201'
    }).as('getRoomDataD201');

    cy.intercept('GET', '**/api/v1/rooms/latest/2000024b080301f5', {
      statusCode: 200,
      body: '@roomDataD202'
    }).as('getRoomDataD202');

    cy.intercept('GET', '**/api/v1/rooms/latest/3000024b080301f5', {
      statusCode: 200,
      body: '@roomDataD207'
    }).as('getRoomDataD207');
  });

  it('Visits Home Page', () => {
    cy.visit('http://localhost:5173/')
    cy.wait('@getSensorData');
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('NavBar returns to homepage', () => {
    cy.visit('http://localhost:5173/D-Block/D202');
    cy.wait('@getSensorData');
    cy.contains('a', 'Home').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('Visits Room D201 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.wait('@getSensorData');
    cy.wait('@getRoomDataD201');
    cy.get('[data-cy="D201"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D201');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });

  it('Visits Room D202 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.wait('@getSensorData');
    cy.get('[data-cy="D202"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D202');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });

  it('Visits Room D207 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.wait('@getSensorData');
    cy.get('[data-cy="D207"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D207');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });
});
