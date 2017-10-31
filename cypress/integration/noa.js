describe('noa region', function() {
    it('should show welcome, markers and nav', function() {
        cy.visit('http://localhost:3000')
        cy.get('path:eq(0)').click({ force: true })

        cy.url().should('include', '/regions/noa')
        cy.get('.region-bienvenido.noa', { timeout: 10000 }).should('be.visible')
        cy.get('a.compositor').should('be.visible')
        cy.get('a.instrumentos').should('be.visible')
        cy.get('.subregion-marker').should('have.lengthOf', 4)
        cy.get('.region-chico').should('be.visible')
        cy.get('.region-chica').should('be.visible')
    })
})