describe('Routing Tests with Mocked Data', () => {
  beforeEach(() => {
    // Load fixture data before each test
    cy.fixture('mockedData').as('mockedData');

    // Intercept the network request to your backend API with mocked data
    // cy.intercept('GET', 'http://co2-app.op-bit.nz/api/v1/devices', { fixtures: 'mockedData' }).as('getSensorData');

  cy.intercept('GET', '**/api/v1/devices', {
    statusCode: 200,
    body: {
      data: [
        {
          id: 1,
          blockName: 'D-Block',
          deviceId: 'eui-1000024b080301f5',
          devices: {
            id: 1,
            room_number: 'D201',
            deviceId: 'eui-1000024b080301f5',
            dev_eui: '1000024b080301f5',
            createdAt: '2021-06-02T09:00:00.000Z',
            blockId: 1,
            data: [
              { id: 1, co2: '250', temperature: '19', createdAt: '2024-03-28T06:53:20.565Z' },
            ]
          }
        }
      ]
    }
  }).as('getSensorData');
  
  cy.intercept('GET', '**/api/v1/rooms/latest/*', {
    statusCode: 200,
    body: { /* mocked room data */ }
  }).as('getRoomData');

  it('Visits Home Page with mocked data', () => {
    cy.visit('http://localhost:5173/')
    cy.wait('@getSensorData'); // Wait for the mocked request to resolve
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('NavBar returns to homepage with mocked data', () => {
    cy.visit('http://localhost:5173/D-Block/D202');
    cy.wait('@getSensorData'); // Wait for the mocked request
    cy.contains('a', 'Home').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('Visits Room D201 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.wait('@getSensorData'); // Ensure data is loaded
    cy.get('[data-cy="D201"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D201');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });

  it('Visits Room D202 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.wait('@getSensorData'); // Ensure data is loaded
    cy.get('[data-cy="D202"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D202');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });

  it('Visits Room D207 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.wait('@getSensorData'); // Ensure data is loaded
    cy.get('[data-cy="D207"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D207');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });
});
