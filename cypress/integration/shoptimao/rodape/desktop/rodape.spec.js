describe('Teste E2E Rodapé - Shoptimao HMG', () => {
  context('Rodapé Desktop', function () {
    before(() => {
      cy.visit('https://hmg-shoptimao-com-br.ns2online.com.br')
    })

    it('Link do Rodapé Visíveis.', () => {
      cy.get('footer ul.institutional')
      .should('be.visible')

      cy.get('footer ul.help')
      .should('be.visible')

      cy.get('ul.phone-buy')
      .should('be.visible')

      cy.get('ul.share-bar')
      .should('be.visible')
    })
  })
})
