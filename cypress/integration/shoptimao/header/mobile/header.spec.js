describe('Teste E2E Header - Shoptimao HMG', () => {
  context('Mobile', function () {
    beforeEach(() => {
      cy.viewport('iphone-6')

      cy.visit('http://hmg-shoptimao-com-br.ns2online.com.br/busca')
    })
  
    it('Logo Visível e com link para a home.', () => {
      cy.get('section .logo.image')
      .should('be.visible')

      cy.get('section .logo.image')
      .should('have.attr', 'href', '/')
    })
    
    it('Campo de busca com sugestões de texto, imagem e redirect a busca correta.', () => {
      cy.wait(1500)
      cy.get('body').then(($body) => {
        if ($body.find('form.search-form').length) {

          cy.get('form.search-form')
          .should('be.visible')

          cy.wait(200)
          cy.get('#search-input')
          .type('tenis')
          .should('have.value', 'tenis')
  
          cy.wait(3000)
          cy.get('body').then(($body) => {
            if ($body.find('.search-field-suggestions__suggestion-block  .search-field-suggestions__suggestion-block__item').length) {
              cy.wait(500)
              cy.get('.search-field-suggestions__suggestion-block  .search-field-suggestions__suggestion-block__item')
              .its('length')
              .should('eq', 1)
            }

            if ($body.find('.search-field-suggestions__products-block div a').length) {
              cy.wait(500)
              cy.get('.search-field-suggestions__products-block div a')
              .its('length')
              .should('gt', 1)
            }
          })

          cy.get('button.ns-icon-search[type="submit"]').click()
          cy.wait(1000)
          cy.url().should('include', 'busca?nsCat=Natural&q=tenis')
        }
      })
    })

    it('Ícone e link Login', () => {
      cy.get('.user-menu .login')
      .should('have.attr', 'href', '/account')
    })

    it('Ícone e link Minicart', () => {
      cy.get('a.mini-cart.ns-icon-cart')
      .should('be.visible')

      cy.get('a.mini-cart')
      .should('have.attr', 'href', '/cart')
    })

    it('Menu abrir/fechar e conteúdo.', () => {
      cy.get('.menu.link')
      .should('be.visible')
      .click()

      cy.wait(500)

      cy.get('.navigation ul > li.item a')
      .its('length')
      .should('gt', 0)

      cy.wait(500)

      cy.get('.navigation ul > li.item .content ul > li a')
      .its('length')
      .should('gt', 0)
    })
  })  
})



