describe('Teste E2E Header - Shoptimao HMG', () => {
  context('Desktop', function () {
    beforeEach(() => {
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

          cy.get('.input-label button[type="submit"]').click()
          cy.wait(1000)
          cy.url().should('include', 'busca?nsCat=Natural&q=tenis')
        }
      })
    })

    it('Ícone e link Login', () => {
      cy.get('.main-user-menu .ns-icon-user')
      .should('be.visible')

      cy.get('.main-user-menu ul li:first-of-type a')
      .should('have.attr', 'href', '/login')
    })

    it('Ícone e link Minicart', () => {
      cy.get('.cart-main-link .ns-icon-cart')
      .should('be.visible')

      cy.get('.cart-main-link')
      .should('have.attr', 'href', '/cart')
    })

    it('Menu hover e conteúdo e banners.', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.main-nav-bar').length) {
          cy.get('.main-navigation .dropdown-item:first-of-type')
          .trigger('mouseover')

          cy.wait(500)

          cy.get('.main-navigation .dropdown-item')
          .its('length')
          .should('gt', 0)

          cy.wait(500)

          cy.get('.main-navigation .dropdown-item:first-of-type .main-submenu-list')
          .its('length')
          .should('gt', 0)

          cy.get('.main-navigation .dropdown-item:first-of-type .multiple-banners ul li')
          .its('length')
          .should('gt', 0)
        }
      })
    })
  })  
})



