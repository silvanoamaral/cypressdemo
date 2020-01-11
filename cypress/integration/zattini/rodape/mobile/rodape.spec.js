describe('Teste E2E Rodapé - Zattini HMG', () => {
  context('Rodapé Desktop', function () {
    beforeEach(() => {
      cy.viewport('iphone-6')

      cy.visit('http://hmg-zattini-com-br.ns2online.com.br')
    })
  
    it('Highlights Visível', () => {
      cy.wait(400)
      cy.get('footer .highlights')
      .should('be.visible')
    })

    it('Link do Rodapé Visíveis.', () => {
      cy.get('footer #institutional')
      .should('be.visible')

      cy.get('li#help.item')
      .should('be.visible')

      cy.get('li#policy')
      .should('be.visible')
    })
  })
})
