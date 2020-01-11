describe('Teste E2E Home - Shoestock HMG', () => {
  context('Home Desktop', function () {
    before(() => {
      cy.visit('https://hmg-shoestock-com-br.ns2online.com.br/')
    })
  
    it('Cadastrar Newsletter e validar sucesso - Botão Sou Homem', () => {
      cy.wait(1500)
      cy.get('body').then(($body) => {
        if ($body.find('.newsletter-information').length) {
          cy.wait(200)
          cy.get('.newsletter-information')
          .find('[type="name"]').type('Teste Regressivo')
          .should('have.value', 'Teste Regressivo')
  
          cy.wait(200)
          cy.get('.newsletter-information')
          .find('[type="email"]').type('regressivo@email.com')
          .should('have.value', 'regressivo@email.com')
  
          cy.wait(1000)
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
  
    it('Chaordic Visível. "[chaordic="top"]"', () => {
      cy.wait(400)
      cy.get('[chaordic="top"]')
      .its('length')
      .should('be.eq', 1)
    })

    it('NAVEGUE PELAS CATEGORIAS "', () => {
      cy.get('.home-gamma__categories-slider')
      .should('be.visible')
    })
  
    it('Banner Tripo Visíveis. ".home-gamma__banner-triple"', () => {
      cy.get('.home-gamma__banner-triple')
      .should('be.visible')
    })
  
    it('Quantidade de "Banner tripo" igual à 9. ".home-gamma__banner-triple > div > div"', () => {
      cy.get('.home-gamma__banner-triple > div > div')
      .its('length')
      .should('eq', 9)
    })
  })  
})
