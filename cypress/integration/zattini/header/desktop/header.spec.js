describe('Teste E2E Header - Zattini HMG', () => {
  context('Desktop', function () {
    beforeEach(() => {
      cy.visit('http://hmg-zattini-com-br.ns2online.com.br/busca')
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
          cy.get('.input-label input')
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

    it('Ícone e link Wishlist', () => {
      cy.get('.my-wishlist .ns-icon-wishlist-heart')
      .should('be.visible')

      cy.get('.my-wishlist .ns-icon-wishlist-heart')
      .should('have.attr', 'href', '/wishlist')
    })

    it('Ícone e link Login', () => {
      cy.get('.main-user-menu .ns-icon-user')
      .should('be.visible')

      cy.get('.main-user-menu ul li:first-of-type a')
      .should('have.attr', 'href', '/login')
    })

    it('Ícone e link Minicart', () => {
      cy.get('a.mini-cart.ns-icon-cart')
      .should('be.visible')

      cy.get('a.mini-cart')
      .should('have.attr', 'href', '/cart')
    })

    it('Inserção de CEP visível', () => {
      cy.get('section.zipcode-content')
      .should('be.visible')

      cy.get('.ns-icon-zipcode-icon')
      .should('be.visible')
    })

    it('Menu abrir/fechar, hotlinks e categorias.', () => {
      cy.wait(1500)
      cy.get('body').then(($body) => {
        if ($body.find('.navbar__header').length) {

          cy.get('.navbar__header .navbar__item')
          .its('length')
          .should('gt', 1)

          cy.get('.navbar__header .navbar__hamburger').click()

          cy.wait(500)

          cy.get('.navbar__dropdown')
          .should('have.class', 'is-active')

          cy.get('.navbar__dropdown--thumb-item.is-active a img')
          .should('be.visible')

          cy.get('.navbar__dropdown--content.is-active .navbar__dropdown--list .navbar__dropdown--item')
          .should('be.visible')

          cy.get('.navbar__header .navbar__hamburger').click()

          cy.wait(500)

          cy.get('.navbar__dropdown')
          .should('not.have.class', 'is-active')
        }
      })
    })
  })  
})



