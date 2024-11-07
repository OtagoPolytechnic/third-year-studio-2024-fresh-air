describe('Admin Panel tests', () => {
    it('Visits Login Page and tests load time', () => {
        cy.visit('http://localhost:5173/login', {
          onBeforeLoad(win) {
            // Marks the start time it takes to load the page
            win.performance.mark('start-loading');
          },
          onLoad(win) {
            cy.get('.mt-10').should('have.text', 'Log in to your account');
            cy.get('[for="email"]').should('have.text', 'E-mail address');
            cy.get('[for="pwd"]').should('have.text', 'Password');
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
    

    it('Successfully login into admin panel', () => {
        cy.visit('http://localhost:5173/login')
    
        cy.get('#email')
          .type(Cypress.env('user_name'))
        cy.get('#pwd')
          .type(Cypress.env('user_password'))
        cy.get('[data-cy="loginButton"]').click()
        
        // cy.get('#ok-btn').click();
        cy.url().should('include', '/')
          
        cy.visit('http://localhost:5173/admin/devices')
      })
  })