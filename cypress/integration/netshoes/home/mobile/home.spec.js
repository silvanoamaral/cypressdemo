describe('Teste E2E Home - Netshoes Mobile HMG', () => {
  context('Mobile iPhone-6', function () {
    before(function () {
      cy.viewport('iphone-6')
      
      cy.visit('http://hmg-netshoes-com-br.ns2online.com.br')
    })

    it('Banners Carousel Middle-2 - isVisible', () => {
      cy.wait(400)
      cy.get('#home-gamma-banners-carousel-middle-2')
      .should('be.visible')
    })

    it('Banners Carousel Bottom - isVisible', () => {
      cy.wait(400)
      cy.get('#home-gamma-banners-carousel-bottom')
      .should('be.visible')
    })

    it('Brands List - isVisible', () => {
      cy.wait(400)
      cy.get('#home-gamma-brands-list')
      .should('be.visible')
    })

    it('App Download - isVisible', () => {
      cy.wait(400)
      cy.get('.home-gamma__app-download')
      .should('be.visible')
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
