describe('Teste E2E Página do seller - Netshoes HMG', () => {
  context('Mobile', function () {
    beforeEach(() => {
      cy.viewport('iphone-6')

      cy.visit('http://hmg-netshoes-com-br.ns2online.com.br/lojista/0')
    })
  
    it('Logo, nome, nota e período de venda visíveis.', () => {
      cy.get('.seller__logo img')
      .should('be.visible')

      cy.get('.seller__name h2')
      .should('be.visible')

      cy.get('.seller__rating-stars')
      .should('be.visible')

      cy.get('.seller__rating-score')
      .should('be.visible')

      cy.get('.seller__rating-sales')
      .should('be.visible')
    })

    it('Descrição visível.', () => {
      cy.get('.seller__description-about')
      .should('be.visible')
    })

    it('Histogram visível.', () => {
      cy.get('.seller__scores')
      .should('be.visible')
    })

    it('Selo entrega no prazo visível.', () => {
      cy.get('.seller__badge-delivery')
      .should('be.visible')
    })

    it('Selo qualidade nos produtos vendidos visível.', () => {
      cy.get('.seller__badge-quality')
      .should('be.visible')
    })

    it('Selo de recomendação visível.', () => {
      cy.get('.seller__badge-recommend')
      .should('be.visible')
    })

    it('Reviews visível e com o selo trustvox.', () => {
      cy.get('.slide-push-tokyo').click()

      cy.wait(700)

      cy.get('.seller__reviews')
      .should('be.visible')

      cy.get('.seller__reviews_item')
      .its('length')
      .should('gt', 1)

      cy.get('.trustvox__image')
      .its('length')
      .should('eq', 1)
    })

    it('Produtos visíveis e botão com link para a search.', () => {
      cy.get('.seller__products')
      .should('be.visible')

      cy.get('.seller__product')
      .its('length')
      .should('gt', 1)

      cy.get('.seller__products_button')
      .should('have.attr', 'href', '/busca?seller=0')
    })
  })  
})
