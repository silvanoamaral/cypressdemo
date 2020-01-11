describe('Teste E2E Search', () => {
  context('Search Desktop', () => {
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

    it('Filtro visivel', () => {
      cy.get('.filters')
      .should('be.visible')
    })

    it('Filtro, Abrir e fechar acordeom', () => {
      cy.get('.filters__filter').first()
      .should('have.class', 'toggled')

      cy.get('.filters__filter .filters__filter__title__textLabel').first().click()
      cy.get('.filters__filter').first()
      .should('not.have.class', 'toggled')

      cy.get('.filters__filter .filters__filter__title__textLabel').first().click()
      cy.get('.filters__filter').first()
      .should('have.class', 'toggled')
    })

    it('Adicionar filtro e comparar quantidade de itens retornados é menor que a inicial', () => {
      const normalizeSerarchResult = (text) => parseFloat(text.split('de')[1].replace(' resultados', ''))

      let initialSearchResult
      cy.get('.search-list .items-info .block').then(($searchResult) => {
        initialSearchResult = normalizeSerarchResult($searchResult.text())
        cy.get('.filters__filter .tipo-de-produto .filters__filter__list__item .filters__filter__list__link label').first().click()
        cy.wait(4000)
        cy.get('.search-list .items-info .block').then(($searchResult) => {
          let finalResult = normalizeSerarchResult($searchResult.text())
          expect(finalResult).to.be.lessThan(initialSearchResult)
        })
      })
    })

    it('Remover um filtro e comparar quantidade de itens retornados é igual a anterior', () => {
      const normalizeSerarchResult = (text) => parseFloat(text.split('de')[1].replace(' resultados', ''))
  
      let initialSearchResult
      cy.get('.search-list .items-info .block').then(($searchResult) => {
        initialSearchResult = normalizeSerarchResult($searchResult.text())
        cy.get('.filters__filter .tipo-de-produto .filters__filter__list__item .filters__filter__list__link label').first().click()
        cy.wait(5000)
        cy.get('.filters__filter .tipo-de-produto .filters__filter__list__item .filters__filter__list__link label').first().click()
        cy.wait(4000)
        cy.get('.search-list .items-info .block').then(($searchResult) => {
          let finalResult = normalizeSerarchResult($searchResult.text())
          expect(finalResult).to.equal(initialSearchResult)
        })
      })
    })

    it('Ordenação', () => {
      cy.get('.sort-accordion .accordion .item').click()
      cy.get('.sort-accordion .accordion .item .content a').last().click()
      cy.wait(1000)
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

    it('Validar QuickView - seletor cor/tamanho/sabor, preço, imagem, nome do produto', () => {
      cy.get('.item-card').eq(2).trigger('mouseover')
      cy.get('.item-card .item-card__images__buttons').eq(2).invoke('show')
      cy.get('.item-card__images #quick-view-button').eq(2).click()

      cy.wait(10000)

      let skuSelected
      cy.get('.is-quickview .product-sku-selector .reference span').first().then(($sku) => {
        skuSelected = $sku.text()

        cy.get('.is-quickview .product-sku-selector .circular .radio-options li').last().click()

        cy.wait(5000)

        cy.get('.is-quickview .product-sku-selector .reference span').first().then(($sku) => {
          expect(skuSelected).to.not.equal($sku.text())
          skuSelected = $sku.text()
        })

        cy.wait(5000).then(() => {
          cy.get('.sku-select .radio-options li').last().click()
          
          cy.wait(5000)

          cy.get('.is-quickview .product-sku-selector .reference span').first().then(($sku) => {
            expect(skuSelected).to.not.equal($sku.text())
            skuSelected = $sku.text()
          })

        })

        cy.get('.default-price [itemprop="price"]')
        .should('be.visible')

        cy.get('.showcase .photo figure')
        .should('be.visible')

        cy.get('.is-quickview .showcase h1').then(($productName) => {
          expect($productName.text()).to.include('Bota Gonew Fenix 2.0')
        })

        cy.get('.quickView-modal .modal-close').click()
        cy.get('.quickView-modal')
        .should('not.be.visible')
      })
    })

    it('Validar QuickView - link para a PDP', () => {
      cy.get('.item-card').eq(2).trigger('mouseover')
      cy.get('.item-card .item-card__images__buttons').eq(2).invoke('show')
      cy.get('.item-card__images #quick-view-button').eq(2).click()

      cy.wait(10000)

      cy.get('.is-quickview .quickview-more-details').click()
      cy.location('pathname').should('eq', '/bota-gonew-fenix-20-bege-C62-1065-224')
    })

    it('Validar QuickView - Adicionar ao carrinho / Mini cart', () => {
      cy.get('.item-card').eq(2).trigger('mouseover')
      cy.get('.item-card .item-card__images__buttons').eq(2).invoke('show')
      cy.get('.item-card__images #quick-view-button').eq(2).click()

      cy.wait(10000)

      cy.get('.sku-select .radio-options li').last().click()
          
      cy.wait(5000)

      cy.get('.is-quickview #buy-button-now').click()

      cy.wait(5000)

      cy.get('.mini-cart-list')
      .should('be.visible')
    })

    it('Validar Similares', () => {
      cy.get('.item-card').eq(2).trigger('mouseover')
      cy.get('.item-card .item-card__images__buttons').eq(2).invoke('show')
      cy.get('.item-card__images .link-find-similar').eq(2).click()

      cy.wait(5000)

      cy.get('.product-similar')
      .should('be.visible')
    })

    it('Validar paginação', () => {
      cy.get('.pagination a').first().click()
      cy.url().should('include', '/busca?searchTermCapitalized=&nsCat=Artificial&page=2')
    })

  })
})