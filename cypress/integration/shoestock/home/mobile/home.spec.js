describe('Teste E2E Home - Shoestock Mobile HMG', () => {
  context('Mobile iPhone-6', function () {
    before(function () {
      cy.viewport('iphone-6')
      
      cy.visit('http://hmg-shoestock-com-br.ns2online.com.br')
    })

    it('Navegue pelas Categoris', () => {
      cy.get('.home-gamma__categories-slider')
      .should('be.visible')
    })

    it('Chaordic Visível. "[chaordic="top"]"', () => {
      cy.wait(400)
      cy.get('[chaordic="top"]')
      .its('length')
      .should('be.eq', 1)
    })

    it('Chaordic Visível. "[chaordic="middle"]"', () => {
      cy.wait(400)
      cy.get('[chaordic="middle"]')
      .its('length')
      .should('be.eq', 1)
    })


    it('Banner Visível.', () => {
      cy.wait(400)
      cy.get('#content .home-gamma__full-banner')
      .its('length')
      .should('be.eq', 3)
    })

    it('Cadastrar Newsletter e validar sucesso - Botão Sou Homem', () => {
      cy.wait(1500)
      cy.get('body').then(($body) => {
        if ($body.find('[name="signup-newsletter-5"]').length) {
          cy.get('[name="signup-newsletter-5"]')
          .find('[type="name"]').type('Teste Regressivo')
          .should('have.value', 'Teste Regressivo')

          cy.get('[name="signup-newsletter-5"]')
          .find('[type="email"]').type('regressivo@email.com')
          .should('have.value', 'regressivo@email.com')

          cy.get('.newsletter-button[value="M"]').click()
  
          cy.wait(1000)
          cy.get('body').then(($body) => {
            if ($body.find('.newsletter-response-message p').length) {
              cy.wait(400)
              cy.get('.newsletter-response-message p')
              .its('length')
              .should('eq', 1)
            }
          })
        }
      })
    })
  })
})
