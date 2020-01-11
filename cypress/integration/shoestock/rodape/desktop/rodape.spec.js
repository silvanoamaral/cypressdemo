describe('Teste E2E Rodapé - Shoestock HMG', () => {
  context('Rodapé Desktop', function () {
    before(() => {
      cy.visit('http://hmg-shoestock-com-br.ns2online.com.br')
    })

    it('Receba as novidades!', () => {
      cy.wait(400)
      cy.get('section.newsletter-section')
      .find('input#email-newsletter')
      .type('regressivo@teste.com.br')
      .should('have.value', 'regressivo@teste.com.br')
    })

    it('Social Visível', () => {
      cy.wait(400)
      cy.get('footer .wrapper>section.social')
      .should('be.visible')
    })

    it('Highlights Visível', () => {
      cy.wait(400)
      cy.get('footer .wrapper>section.links')
      .should('be.visible')
    })

    it('Payment flags Visível', () => {
      cy.wait(400)
      cy.get('footer .wrapper>section.payments')
      .should('be.visible')
    })
  })
})
