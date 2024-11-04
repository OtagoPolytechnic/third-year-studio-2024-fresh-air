describe('Sensor History Component Tests with Mocked Data', () => {  
  it('Visits the D202 Page and tests component load time', () => {
    cy.visit('http://localhost:5173/D-Block/D207', {
      onBeforeLoad(win) {
        // Marks the start time it takes to load the page
        win.performance.mark('start-loading');
      },
      onLoad(win) {
        cy.get('[data-cy="SensorHistory"]').should('be.visible');
        cy.get('[data-cy="QuickFilter"]').should('be.visible');
        cy.get('[data-cy="SensorFilter"]').should('be.visible');
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

  it('QuickFilter Today test', () => {
    cy.visit('http://localhost:5173/D-Block/D207');
    cy.get('[aria-label="Today"]').should('be.visible').click();
    // Hover at first position and capture the tooltip text
    cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
    cy.wait(500);
    cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible');
  });

  it('QuickFilter Week test', () => {
    cy.visit('http://localhost:5173/D-Block/D207');
    cy.get('[aria-label="Last week"]').should('be.visible').click();

    let tooltipText1, tooltipText2;

    cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
    cy.wait(500);
    cy.get('[data-testid="tooltip"]', { timeout: 10000 })
      .should('be.visible')
      .invoke('text')
      .then((text1) => {
        tooltipText1 = text1;
      });

    cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 600, y: 200 }, { force: true });
    cy.wait(500);
    cy.get('[data-testid="tooltip"]', { timeout: 10000 })
      .should('be.visible')
      .invoke('text')
      .then((text2) => {
        tooltipText2 = text2;

        expect(tooltipText1).to.not.equal(tooltipText2);
      });
  });

  it('QuickFilter Month test', () => {
    cy.visit('http://localhost:5173/D-Block/D207');
    cy.get('[aria-label="Last month"]').should('be.visible').click();

    let tooltipText1, tooltipText2;

    cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
    cy.wait(500);
    cy.get('[data-testid="tooltip"]', { timeout: 10000 })
      .should('be.visible')
      .invoke('text')
      .then((text1) => {
        tooltipText1 = text1;
      });

    cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 600, y: 200 }, { force: true });
    cy.wait(500);
    cy.get('[data-testid="tooltip"]', { timeout: 10000 })
      .should('be.visible')
      .invoke('text')
      .then((text2) => {
        tooltipText2 = text2;

        expect(tooltipText1).to.not.equal(tooltipText2);
      });
  });

  it('Forum test passing', () => {
    cy.visit('http://localhost:5173/D-Block/D207');
    const today = new Date().toISOString().split('T')[0];
    cy.get('[data-cy="startLabel"]').click().type(today);
    cy.get('[data-cy="endLabel"]').click().type(today);
    cy.get('[data-cy="submitButton"]').click();

    // Hover at first position and capture the tooltip text
    cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
    cy.wait(500);
    cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible');
  });

  it('Forum test fail', () => {
    cy.visit('http://localhost:5173/D-Block/D207');
    cy.get('[data-cy="startLabel"]').click().type('2023-08-15');
    cy.get('[data-cy="endLabel"]').click().type('2023-08-15');
    cy.get('[data-cy="submitButton"]').click();
  });
});
  