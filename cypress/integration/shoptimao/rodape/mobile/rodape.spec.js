describe('Teste E2E Rodapé - Shoptimao HMG', () => {
  context('Rodapé Desktop', function () {
    before(() => {
      cy.viewport('iphone-6')

      cy.visit('https://hmg-shoptimao-com-br.ns2online.com.br')
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

      cy.get('li#phone-buy')
      .should('be.visible')
    })
  })
})
