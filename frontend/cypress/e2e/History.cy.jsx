describe('Test to see ifSensorHistory component loads', () => {
    // it('SensorHistory component loads', () => {
    //     cy.visit('http://localhost:5173/D-Block/D207')
    //     cy.get('[data-cy="SensorHistory"]').should('be.visible');
    // });
    // it('QuickFilter component loads', () => {
    //     cy.visit('http://localhost:5173/D-Block/D207')
    //     cy.get('[data-cy="QuickFilter"]').should('be.visible');
    // });
    // it('SensorFilter component loads', () => {
    //     cy.visit('http://localhost:5173/D-Block/D207')
    //     cy.get('[data-cy="SensorFilter"]').should('be.visible');
        
    // });

    // it('QuickFilter Today test', () => {
    //     cy.visit('http://localhost:5173/D-Block/D207')
    //     cy.get('[aria-label="Today"]').should('be.visible').click();

    //     // Hover at first position and capture the tooltip text
    //     cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
    //     cy.wait(500); 
    //     cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible');
    // });

    // it('QuickFilter Week test', () => {
    //     cy.visit('http://localhost:5173/D-Block/D207')
    //     cy.get('[aria-label="Last week"]').should('be.visible').click();

    //     let tooltipText1, tooltipText2;

    //     cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
    //     cy.wait(500); 
    //     cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible')
    //         .invoke('text').then((text1) => {
    //             tooltipText1 = text1;
    //         });

    //     cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 400, y: 200 }, { force: true });
    //     cy.wait(500); 
    //     cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible')
    //     .invoke('text').then((text2) => {
    //         tooltipText2 = text2;

    //     expect(tooltipText1).to.not.equal(tooltipText2);
    //     });
    // });

    // it('QuickFilter Month test', () => {
    //     cy.visit('http://localhost:5173/D-Block/D207')
    //     cy.get('[aria-label="Last month"]').should('be.visible').click();

    //     let tooltipText1, tooltipText2;

    //     cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
    //     cy.wait(500);
    //     cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible')
    //         .invoke('text').then((text1) => {
    //             tooltipText1 = text1;
    //         });

    //     cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 400, y: 200 }, { force: true });
    //     cy.wait(500); 
    //     cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible')
    //     .invoke('text').then((text2) => {
    //         tooltipText2 = text2;
    //     expect(tooltipText1).to.not.equal(tooltipText2);
    //     });
    // });

    it('Forum test passing', () => {
        cy.visit('http://localhost:5173/D-Block/D207');
        cy.get('[data-cy="startLabel"]').click().type("2024-08-15");
        cy.get('[data-cy="endLabel"]').click().type("2024-08-15");
        cy.get('[data-cy="submitButton"]').click();

        // Hover at first position and capture the tooltip text
        cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
        cy.wait(500); 
        cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible');
    });

    it('Forum test fail', () => {
        cy.visit('http://localhost:5173/D-Block/D207');
        cy.get('[data-cy="startLabel"]').click().type("2023-08-15");
        cy.get('[data-cy="endLabel"]').click().type("2023-08-15");
        cy.get('[data-cy="submitButton"]').click();


    });
});