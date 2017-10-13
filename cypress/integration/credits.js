describe('accessing credits page', function() {
    it('should display the credits info', function() {
        cy.visit('http://localhost:3000')
        cy.get('.credits-button').click()
        cy.url().should('include', '/credits')
        
        cy.get('.globito').should('be.visible')
        cy.get('.credits-container').should('be.visible')
        cy.get('a.volver').should('be.visible')
    })
})