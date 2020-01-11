describe('Teste E2E Rodapé - Shoestock HMG', () => {
  context('Rodapé Mobile', function () {
    before(() => {
      cy.viewport('iphone-6')

      cy.visit('http://hmg-shoestock-com-br.ns2online.com.br')
    })
  
    it('Highlights Visível', () => {
      cy.wait(400)
      cy.get('.mobile footer .list-links')
      .should('be.visible')
    })

    it('Social Visível', () => {
      cy.wait(400)
      cy.get('section.line.social-bar')
      .should('be.visible')
    })

    it('Payment flags Visível', () => {
      cy.wait(400)
      cy.get('.mobile footer section.payment-flags')
      .should('be.visible')
    })

    it('Receba as novidades!', () => {
      cy.wait(400)
      cy.get('section.newsletter-section')
      .find('input#email-newsletter')
      .type('regressivo@teste.com.br')
      .should('have.value', 'regressivo@teste.com.br')
    })    

    it('Link do Rodapé Visíveis.', () => {
      cy.get('.mobile footer section.help-center')
      .should('be.visible')

      cy.get('.mobile footer section.help')
      .should('be.visible')
    })
  })
})
