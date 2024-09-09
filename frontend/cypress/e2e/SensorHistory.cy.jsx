describe('Sensor History spec', () => {
    it('Visits Sensor History Page', () => {
        cy.visit('http://localhost:5173/SensorHistory')
        cy.get('[class="recharts-wrapper"]').should('be.visible')
    })

    it('Testing hover for tooltip', () => {
        cy.visit('http://localhost:5173/SensorHistory')
        cy.wait(500)
        cy.get('[class="recharts-rectangle"]').last().click();
        cy.get('[data-testid="tooltip"]').should('be.visible', { timeout: 10000 });
    })
})
