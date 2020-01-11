describe('Teste E2E Home - Shoptimao Mobile HMG', () => {
  context('Mobile iPhone-6', function () {
    before(function () {
      cy.viewport('iphone-6')
      
      cy.visit('https://hmg-shoptimao-com-br.ns2online.com.br')
    })

    it('Div Chaordic existe na página.', () => {
      cy.wait(400)
      cy.get('[chaordic="top"]')
      .its('length')
      .should('eq', 1)

      cy.get('[chaordic="middle"]')
      .its('length')
      .should('eq', 1)
    
      cy.get('[chaordic="bottom"]')
      .its('length')
      .should('eq', 1)
    })
  
    it('Banner Full Visível.', () => {
      cy.get('.full-banner')
      .should('be.visible')
    })

    it('Banner Principal Visível.', () => {
      cy.get('.swiper-wrapper')
      .should('be.visible')
    })
  })
})
