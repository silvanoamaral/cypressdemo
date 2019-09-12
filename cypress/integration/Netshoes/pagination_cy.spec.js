describe('Teste Netshoes HMG', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Faz uma busca e escolhe uma paginação', () =>{
        cy.get('.pagination a:eq(1)').click()
    })
});