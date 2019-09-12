describe('Teste Netshoes HMG', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Abrir Menu Principal', () =>{
        cy.get('li.navbar__item.menu').click()
    })

    it('Fechar Menu Principal', () =>{
        cy.get('li.navbar__item.menu').click()
    })
});