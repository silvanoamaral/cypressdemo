describe('Teste Netshoes HMG', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Seleciona o Primeiro Produto da Lista', () =>{
        cy.get('[qa-automation="search-itens"]:first').click()
    })
});