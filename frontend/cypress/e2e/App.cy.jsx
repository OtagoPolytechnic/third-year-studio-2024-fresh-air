describe('Routing Tests with Mocked Data', () => {
  beforeEach(() => {
    // Load fixture data before each test
    cy.fixture('mockedData').as('mockedData');

    // Intercept the network request to your backend API with mocked data
    // cy.intercept('GET', 'http://co2-app.op-bit.nz/api/v1/devices', { fixtures: 'mockedData' }).as('getSensorData');
  cy.intercept('GET', '**/api/v1/devices', {
    statusCode: 200,
    body: {
          "statusCode": 200,
          "data": [
            {
              "id": 1,
              "room_number": "D201",
              "deviceId": "eui-1000024b080301f5",
              "dev_eui": "1000024b080301f5",
              "createdAt": "2024-09-16T01:25:05.687Z",
              "updatedAt": "2024-09-16T01:25:05.687Z",
              "blockId": 1
            },
            {
              "id": 2,
              "room_number": "D202",
              "deviceId": "eui-2000024b080301f5",
              "dev_eui": "2000024b080301f5",
              "createdAt": "2024-09-16T01:25:05.695Z",
              "updatedAt": "2024-09-16T01:25:05.695Z",
              "blockId": 1
            },
            {
              "id": 3,
              "room_number": "D207",
              "deviceId": "eui-3000024b080301f5",
              "dev_eui": "3000024b080301f5",
              "createdAt": "2024-09-16T01:25:05.702Z",
              "updatedAt": "2024-09-16T01:25:05.702Z",
              "blockId": 1
            },
          ],
          "nextPage": null
        }
    }).as('getSensorData');
  
  cy.intercept('GET', '**/api/v1/rooms/latest/1000024b080301f5', {
      "statusCode": 200,
  "data": {
    "id": 4,
    "co2": "850",
    "temperature": "22",
    "createdAt": "2024-09-16T01:25:05.736Z",
    "updatedAt": "2024-09-16T01:25:05.736Z",
    "deviceId": "eui-1000024b080301f5",
    "dev_eui": "1000024b080301f5",
    "device": {
      "id": 2,
      "room_number": null,
      "deviceId": "eui-1000024b080301f5",
      "dev_eui": "1000024b080301f5",
      "createdAt": "2024-09-16T01:25:05.695Z",
      "updatedAt": "2024-09-16T01:25:05.695Z",
      "blockId": 2
    }
  }
  }).as('getRoomData');

  cy.intercept('GET', '**/api/v1/rooms/latest/2000024b080301f5', {
    "statusCode": 200,
"data": {
  "id": 4,
  "co2": "478",
  "temperature": "22",
  "createdAt": "2024-09-16T01:25:05.736Z",
  "updatedAt": "2024-09-16T01:25:05.736Z",
  "deviceId": "eui-2000024b080301f5",
  "dev_eui": "2000024b080301f5",
  "device": {
    "id": 2,
    "room_number": "D202",
    "deviceId": "eui-2000024b080301f5",
    "dev_eui": "2000024b080301f5",
    "createdAt": "2024-09-16T01:25:05.695Z",
    "updatedAt": "2024-09-16T01:25:05.695Z",
    "blockId": 2
  }
}
}).as('getRoomData');

cy.intercept('GET', '**/api/v1/rooms/latest/3000024b080301f5', {
  "statusCode": 200,
"data": {
"id": 4,
"co2": "647",
"temperature": "22",
"createdAt": "2024-09-16T01:25:05.736Z",
"updatedAt": "2024-09-16T01:25:05.736Z",
"deviceId": "eui-3000024b080301f5",
"dev_eui": "3000024b080301f5",
"device": {
  "id": 2,
  "room_number": "D207",
  "deviceId": "eui-3000024b080301f5",
  "dev_eui": "3000024b080301f5",
  "createdAt": "2024-09-16T01:25:05.695Z",
  "updatedAt": "2024-09-16T01:25:05.695Z",
  "blockId": 2
}
}
}).as('getRoomData');

  })

  it('Visits Home Page', () => {
    cy.visit('http://localhost:5173/')
    cy.wait('@getSensorData'); // Wait for the mocked request to resolve
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('NavBar returns to homepage', () => {
    cy.visit('http://localhost:5173/D-Block/D202');
    cy.wait('@getSensorData'); // Wait for the mocked request
    cy.contains('a', 'Home').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('Visits Room D201 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.wait('@getSensorData'); // Ensure data is loaded
    cy.wait('@getRoomData')
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
