describe('Routing Tests with Mocked Data', () => {
  it('Visits Home Page and tests load time', () => {
    cy.visit('http://localhost:5173/', {
      onBeforeLoad(win) {
        // Marks the start time it takes to load the page
        win.performance.mark('start-loading');
      },
      onLoad(win) {
        cy.get('[data-cy="C-Block"]').should('have.text', 'C-Block');
        cy.get('[data-cy="D-Block"]').should('have.text', 'D-Block');
        // Marks the end time
        win.performance.mark('end-loading');
        // Calculates the difference between start and end time
        win.performance.measure('pageLoad', 'start-loading', 'end-loading');
      },
    }).then(() => {
      cy.window().then((win) => {
        const loadTime = win.performance.getEntriesByName('pageLoad')[0].duration;
        cy.log(`Home page load time: ${loadTime} ms`);
        expect(loadTime).to.be.lessThan(3000);
      });
    });
  });

  it('Visits Block Page and tests load time', () => {
    cy.visit('http://localhost:5173/D-Block', {
      onBeforeLoad(win) {
        // Marks the start time it takes to load the page
        win.performance.mark('start-loading');
      },
      onLoad(win) {
        cy.get('[data-cy="h1Welcome"]').should('be.visible')
        cy.get('[data-cy="D201"]').should('be.visible');
        cy.get('[data-cy="D207"]').should('be.visible');
        // Marks the end time
        win.performance.mark('end-loading');
        // Calculates the difference between start and end time
        win.performance.measure('pageLoad', 'start-loading', 'end-loading');
      },
    }).then(() => {
      cy.window().then((win) => {
        const loadTime = win.performance.getEntriesByName('pageLoad')[0].duration;
        cy.log(`Home page load time: ${loadTime} ms`);
        expect(loadTime).to.be.lessThan(3000);
      });
    });
  });

  it('NavBar returns to homepage', () => {
    cy.visit('http://localhost:5173/C-Block/D202');
    cy.contains('a', 'Home').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('[data-cy="C-Block"]').should('have.text', 'C-Block');
  });

  it('Visits Room D201 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="D-Block"]').click();
    cy.get('[data-cy="D201"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D201');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });

  it('Visits Room D202 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="C-Block"]').click();
    cy.get('[data-cy="D202"]').click();
    cy.url().should('eq', 'http://localhost:5173/C-Block/D202');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });

  it('Visits Room D207 and verifies chart is visible', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="D-Block"]').click();
    cy.get('[data-cy="D207"]').click();
    cy.url().should('eq', 'http://localhost:5173/D-Block/D207');
    cy.get('[id*="reactgooglegraph-"]').should('be.visible');
  });
});