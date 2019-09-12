describe('Teste Netshoes HMG', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    beforeEach(() => {
        cy.visit('http://hmg-netshoes-com-br.ns2online.com.br')
    })

    it('Buscando Tenis Nike', () =>{
        cy.get('#search-input').type('tenis')
        cy.get('[qa-automation="home-search-button"]').click()
    })
});