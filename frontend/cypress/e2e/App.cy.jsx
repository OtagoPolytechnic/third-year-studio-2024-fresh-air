describe('WebSocket and Routing Tests', () => {
  it('Mocks WebSocket and fetches data', () => {
    cy.mockWebSocket({ data: [ /* Mock data that triggers the API call */ ] });
  
    cy.visit('http://localhost:5173/')
    .get('[data-cy="D201"]').click()
    .url().should('eq', 'http://localhost:5173/D-Block/D201')
    .get('[data-cy="D201"]').should('be.visible');
  }); 

  it('Visits Home Page', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="h1Welcome"]').should('have.text', 'Welcome to D-Block CO2 Monitor');
  });

  it('Visits Room D201', () => {
    cy.visit('http://localhost:5173/')
      .get('[data-cy="D201"]').click()
      .url().should('eq', 'http://localhost:5173/D-Block/D201')
      .get('[data-cy="D201"]').should('be.visible').click();

  });

  it('Visits Room D202', () => {
    cy.visit('http://localhost:5173/')
      .get('[data-cy="D202"]').click()
      .url().should('eq', 'http://localhost:5173/D-Block/D202')
      .get('[data-cy="D202"]').should('be.visible').should('be.visible');
  });

  // it('Visits Room D207', () => {
  //   cy.visit('http://localhost:5173/')
  //     .get('[data-cy="D207"]').click()
  //     .url().should('eq', 'http://localhost:5173/D-Block/D207')
  //     .get('[data-cy="D207"]').should('be.visible');
  // });

  // it('Visits Room D207 TD', () => {
  //   cy.visit('http://localhost:5173/')
  //     .get('[data-cy="D207 TD"]').click()
  //     .url().should('eq', 'http://localhost:5173/D-Block/D207%20Testing')
  //     .get('[data-cy="D207 TD"]').should('be.visible');
  // });

  // Uncomment and test Sensor History if needed
  // it('Visits Sensor History', () => {
  //   cy.visit('http://localhost:5173/')
  //     .get('[data-cy="SensorHistory"]').click()
  //     .url().should('eq', 'http://localhost:5173/SensorHistory')
  //     .get('[class="recharts-wrapper"]').should('be.visible');
  // });

  // it('Testing hover for tooltip', () => {
  //   cy.visit('http://localhost:5173/SensorHistory')
  //   cy.wait(500)
  //   cy.get('[class="recharts-rectangle"]').last().click();
  //   cy.get('[data-testid="tooltip"]').should('be.visible', { timeout: 10000 });
  // })
});
