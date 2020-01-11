describe('Teste E2E Search', () => {
  context('Search Mobile', () => {
    beforeEach(() => {
      cy.visit('http://hmg-netshoes-com-br.ns2online.com.br/busca')
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
  
          cy.get('.search-form button[type="submit"]').click()
          cy.wait(1000)
          cy.url().should('include', 'busca?nsCat=Natural&q=tenis')
        }
      })
    })

    it('Filtro visivel', () => {
      cy.get('#show-filters').click()
      cy.get('#filter-aggregation')
      .should('be.visible')
    })

    it('Filtro, Abrir e fechar acordeom', () => {
      cy.get('#show-filters').click()
    
      cy.get('.filters__filter').eq(2).click()
      cy.get('.filters__filter').eq(2)
      .should('have.class', 'toggled')

      cy.wait(5000)

      cy.get('.filters__filter').eq(4).click()
      cy.get('.filters__filter').eq(2)
      .should('not.have.class', 'toggled')
    })

    it('Adicionar filtro e comparar quantidade de itens retornados é menor que a inicial', () => {
      //30.027 produtos
      const normalizeSerarchResult = (text) => parseFloat(text.replace(' produtos', ''))

      let initialSearchResult
      cy.get('.info-list .info-list__quantity').then(($searchResult) => {
        initialSearchResult = normalizeSerarchResult($searchResult.text())

        cy.get('#show-filters').click()

        cy.get('.filters__filter').eq(1).click()

        cy.get('.filters__filter .tipo-de-produto .filters__filter__list__item .filters__filter__list__item__label').first().click()
        cy.wait(4000)
        cy.get('.filters__apply-container__btn').click()
        cy.wait(5000)
        cy.get('.info-list .info-list__quantity').then(($searchResult) => {
          let finalResult = normalizeSerarchResult($searchResult.text())
          expect(finalResult).to.be.lessThan(initialSearchResult)
        })
      })
    })

    it('Remover um filtro e comparar quantidade de itens retornados é igual a anterior', () => {
      const normalizeSerarchResult = (text) => parseFloat(text.replace(' produtos', ''))

      let initialSearchResult
      cy.get('.info-list .info-list__quantity').then(($searchResult) => {
        initialSearchResult = normalizeSerarchResult($searchResult.text())

        cy.get('#show-filters').click()

        cy.get('.filters__filter').eq(1).click()

        cy.get('.filters__filter .tipo-de-produto .filters__filter__list__item .filters__filter__list__item__label').first().click()
        cy.wait(4000)
        cy.get('.filters__apply-container__btn').click()
        cy.wait(5000)
        let filteredResult
        cy.get('.info-list .info-list__quantity').then(($searchResult) => {
          filteredResult = normalizeSerarchResult($searchResult.text())
        })
        cy.wait(5000).then(() => {
          cy.get('#show-filters').click()

          cy.get('.filters__filter').eq(1).click()

          cy.get('.filters__filter .tipo-de-produto .filters__filter__list__item .filters__filter__list__item__label').first().click()
          cy.wait(4000)
          cy.get('.filters__apply-container__btn').click()
          cy.wait(1000)
          cy.get('.info-list .info-list__quantity').then(($searchResult) => {
            let finalResult = normalizeSerarchResult($searchResult.text())
            expect(finalResult).to.equal(initialSearchResult)
          })
        })
      })

    })

    it('Ordenação', () => {
      cy.get('#show-filters').click()
      cy.get('.filters__filter .sort__list .filters__filter__list__item .filters__filter__list__item__label').last().click()
      cy.url().should('include', 'sort=lowest-first')
    })

    it('Validar Wishlist client', () => {
      cy.get('.wishlist').eq(2).click()

      cy.wait(10000)

      cy.get('#username').type('ns.teste.qa.marcelo@gmail.com')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.wait(50000).then(() => {
        cy.get('.wishlist .wishlist__heart__logo').eq(2)
        .should('have.class', 'ns-icon ns-icon-wishlist-heart-active')

        //Validando se coração é selecionado

        cy.get('.wishlist').first().click()
        cy.get('.wishlist .wishlist__heart__logo').first()
        .should('have.class', 'ns-icon ns-icon-wishlist-heart-active')
        
        cy.get('.wishlist').first().click()
        cy.get('.wishlist .wishlist__heart__logo').first()
        .should('not.have.class', 'ns-icon ns-icon-wishlist-heart-active')
      })
    })

    it('Validar Wishlist Response API', () => {

      cy.request('https://hmg-netshoes-com-br.ns2online.com.br/wishlist/add/D29-0746-172')
      .should((response) => {
        expect(response.body).to.equal(true)
      })

      cy.request('https://hmg-netshoes-com-br.ns2online.com.br/wishlist/delete/D29-0746-172')
      .should((response) => {
        expect(response.body).to.equal(false)
      })
    })

    it('Validar Similares', () => {
  
      cy.get('.similar .ns-icon').first().click()
      cy.get('.similar .link-find-similar').first().click()
  
      cy.wait(5000)

      cy.get('.modal-similar__content')
      .should('be.visible')
    })

    it('Validar paginação', () => {
      cy.get('.pagination a').first().click()
      cy.url().should('include', '/busca?searchTermCapitalized=&nsCat=Artificial&page=2')
    })
  })
})