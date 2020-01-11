describe('Teste E2E Home - Shoptimao HMG', () => {
  context('Home Desktop', function () {
    before(() => {
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
  
    it('Banner Principal Visível.', () => {
      cy.get('.full-banner-background')
      .should('be.visible')
    })

    it('swiper-wrapper Visíveis.', () => {
      cy.get('ul.swiper-wrapper')
      .should('be.visible')
    })
  })  
})
