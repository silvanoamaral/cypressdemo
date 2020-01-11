describe('Teste E2E Rodapé - Zattini HMG', () => {
  context('Rodapé Desktop', function () {
    beforeEach(() => {
      cy.visit('http://hmg-zattini-com-br.ns2online.com.br')
    })
  
    it('Palavras mais buscadas', () => {
      cy.wait(400)
      cy.get('.most-wanted-word')
      .should('be.visible')
    })
  
    it('Highlights Visível', () => {
      cy.wait(400)
      cy.get('footer .highlights-section')
      .should('be.visible')
    })

    it('Link do Rodapé Visíveis.', () => {
      cy.get('footer ul.institutional')
      .should('be.visible')

      cy.get('footer ul.help')
      .should('be.visible')

      cy.get('footer ul.help')
      .should('be.visible')

      cy.get('li .central-doubts-button')
      .should('be.visible')

      cy.get('ul.share-bar-social li')
      .should('be.visible')

      cy.get('.app-mobile')
      .should('be.visible')
    })
  })
})