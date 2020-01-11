describe('PDP - Standard Flow', function () {
  context('PDP - Desktop', function () {
    // Executed once before beginning tests
    before(function () {
      cy.visit('https://hmg-shoptimao-com-br.ns2online.com.br/tenis-nike-primo-court-preto+branco-004-6194-026');

    })

    // Executed every time before beginning each test
    beforeEach(function () {
      cy.viewport('iphone-6')

      // Create alias for Route Ajax Product Info
      cy.server();
      cy.route('GET', /.+\/refactoring\/[\w\-\+]+(\w{3}\-\w{4}\-\w{3}(\-\w{2})?(\?.+)?)$/).as('ajaxPdpShowcase')
    })


    it('Verificar Exibição da Imagem, Preço e Nome do Produto', function () {

      // Get product main Image and check if there is a src attribute with a product image url
      cy.get('section#photo figure.photo-figure img.zoom')
        .first()
        .invoke('attr', 'src')
        .should(($src) => {
          expect($src).to.match(/\w{3}\-\w{4}\-\w{3}_zoom1\./)
        });

      // Verify if the caroussel of Product Images are not empty
      cy.get('section#photo .swiper-wrapper').should(($list) => {
        expect($list).to.have.descendants('figure')
        expect($list.children.length).to.be.greaterThan(1)
      });

      // Check if the price is not empty
      cy.get('.price__currency span[itemprop="price"]')
        .should('not.be.empty')

      // Check if the product name is not empty
      cy.get('.product-title h1[itemprop="name"]')
        .should('not.be.empty')

    });


    it('Carrossel de imagens & Seleção de imagem & Modal de Zoom', function () {

      // Get images caroussel container and swipe through images
      cy.get('#buy-box #photo .swiper-container')
        // Swipe left twice
        .trigger('mousedown', { which: 1, pageX: 300, pageY: 300 })
        .trigger('mousemove', { which: 1, pageX: 0, pageY: 300 })
        .trigger('mouseup', { force: true })
        .trigger('mousedown', { which: 1, pageX: 300, pageY: 300 })
        .trigger('mousemove', { which: 1, pageX: 0, pageY: 300 })
        .trigger('mouseup', { force: true })
        .then(($slider) => {

          // Create Alias for swipper wrapper as @sliderPhotos
          cy.get('.swiper-wrapper').children().as('sliderPhotos')

          // Get second element and check if it has class swiper-slide-prev
          cy.get('@sliderPhotos').eq(1)
            .should('have.class', 'swiper-slide-prev')

          // Get first element and check if it has class swiper-slide-active
          cy.get('@sliderPhotos').eq(2)
            .should('have.class', 'swiper-slide-active')

          // Swipe right once
          cy.wrap($slider)
            .trigger('mousedown', { which: 1, pageX: 0, pageY: 300 })
            .trigger('mousemove', { which: 1, pageX: 200, pageY: 300 })
            .trigger('mouseup', { force: true })

          // Get second element and check if it has class swiper-slide-active
          cy.get('@sliderPhotos').eq(1)
            .should('have.class', 'swiper-slide-active')

          // Get first element and check if it has class swiper-slide-prev
          cy.get('@sliderPhotos').first()
            .should('have.class', 'swiper-slide-prev')

        })


      // Click on the Visible Image and check if the Modal Zoom Opens
      cy.get('#photo .swiper-slide-active').click()
      cy.get('[data-slide-push-target-photo="product-image-zoom-main"]')
        .should('have.class', 'open')
        .then(($modal) => {

          // Get close PhotoSwipe Modal Button and click
          cy.get('[data-slide-push-close-photo="product-image-zoom-main"]')
            .click()

          // Check if the modal is closed
          cy.url().should('not.include', '#photoswipe')
          cy.wrap($modal).should('not.have.class', 'open')
        })
    });

    it('Verifica Espaços para Chaordic', function () {
      // Get Top div for chaordic
      cy.get('[chaordic="top"]')
      // Get Middle div for chaordic
      cy.get('[chaordic="middle"]')

    });

    it('Validar sem SKU selecionado - Botão Comprar', function () {

      // Cretae alias for Color/Flavor/Size selector Modal as @cfsSelector
      cy.get('section.cfs [data-slide-push-target="selector-content-cfs"]').as('cfsSelector')

      // Get a Buy Button and click on it
      cy.get('section.call-to-action-wrapper #buy-button-now-buy-box').as('buyButtons')
      cy.get('@buyButtons').eq(0)
        .click()

      // Check if the CFS modal is open, check if the close button is visible and click on it
      // and check if the modal is closed
      cy.get('@cfsSelector')
        .should('have.class', 'open')
        .within(() => {
          cy.get('span.close-modal-button').should('have.class', 'hide')

          cy.get('i.ns-icon-close-x').should('not.have.class', 'hide')
            .click()
        })
        .and('not.have.class', 'open')

      // Same steps for float Button
      cy.url().should('not.include', '#open')
      // Get a Buy Button and click on it
      cy.get('@buyButtons').eq(1)
        .click()

      // Check if the CFS modal is open, check if the close button is visible and click on it
      // and check if the modal is closed
      cy.get('@cfsSelector')
        .should('have.class', 'open')
        .within(() => {
          cy.get('span.close-modal-button').should('have.class', 'hide')

          cy.get('i.ns-icon-close-x').should('not.have.class', 'hide')
            .click()
        })
        .and('not.have.class', 'open')

    });


    it('Validar Botão Comprar com SKU Selecionado', function () {

      // create a variable to storage selected SKU
      let skuSelected;

      // Declare and create an alias for cart-add ajax as @ajaxAddToCart
      cy.route('POST', /.+\/cart\/add/).as('ajaxAddToCart')

      // Get button to open Color/flavor/size Modal
      cy.get('[data-slide-push-trigger="selector-content-cfs"]')
        .click()

      // Get modal of CFS, check if it is open
      cy.get('section.cfs [data-slide-push-target="selector-content-cfs"]')
        .should('have.class', 'open')
        .then(($selector) => {

          // Check if the SKU selected before has class active
          cy.get('.product__color--list li:not(.unavailable)').children().first()
            .should('have.class', 'active')

          // Select first Size
          cy.get('.product__size--list li:not(.unavailable)')
            .click()

          // Wait for new SKU ajax request to end
          cy.wait('@ajaxPdpShowcase')

          // Check if close X button is hidden
          cy.get('i.ns-icon-close-x').should('have.class', 'hide')

          // Check if close OK button is visible and click on it
          cy.get('span.close-modal-button').should('not.have.class', 'hide')
            .click()
        })

      // Check if CFS modal is closed
      cy.get('section.cfs [data-slide-push-target="selector-content-cfs"]')
        .should('not.have.class', 'open')

      // Add selected SKU to cart
      cy.get('[data-product-sku*="-"]').then(($skuSelected) => {
        // Set a value with selected sku for the variable
        skuSelected = $skuSelected.data('product-sku');

        // Get buy button and click on it
        cy.get('#buy-button-now-buy-box.button-no-float')
          .click()

        // Wait for request cart-add and check if redirect to /cart
        cy.wait('@ajaxAddToCart');
        cy.location().should(loc => {
          expect(loc.pathname).to.match(/\/(novo\-)?cart/)
        })

        // verify if the sku selected is infact the sku add to the cart
        cy.get('.product-item  a')
          .invoke('attr', 'href')
          .should('contain', skuSelected);
      })

    });

    it('Validar Reviews', function () {

      cy.visit('https://hmg-shoptimao-com-br.ns2online.com.br/tenis-nike-sb-check-solar-masculino-preto+marrom-D12-2758-256')
      // Create an Alias for ajax reviews request as @getReviews
      cy.route('GET', /.+\/reviews\?.+/).as('getReviews')

      // Check if there is the Customer Feedback
      cy.get('#reviews')
        // Check the title of the container
        .contains('Opiniões dos clientes')
        .then(() => {
          // Click on button reviews to open Modal
          cy.get('[data-slide-push-trigger="reviews"]').click()

          // Validate if the modal is openned
          cy.get('[data-slide-push-target="reviews"]')
            .should('have.class', 'open')
            .then(($modal) => {

              // Check if there are 10 reviews in the modal
              cy.get('.detail-content [data-reviews-list]')
                .children()
                .should('not.have.length', 0) // 12 because btn load more and Logo are children

              // Click on close modal button and check if it is closed
              cy.get('[data-slide-push-close="reviews"]').click()
              cy.wrap($modal).should('not.have.class', 'open')
            })
        })
    })

  });
});