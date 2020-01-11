describe('PDP - Standard Flow', function () {
  context('PDP - Desktop', function () {
    // Executed once before beginning tests
    before(function () {
      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/bota-coturno-griffe-tratorada-fivela-feminina-bege-BAV-0030-004');

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
          cy.get('.product__color--list').children().first()
            .should('have.class', 'active')

          // Select first Size
          cy.get('.product__size--list li:not(.unavailable)').eq(0)
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

    it('Validar Reviews & Enviar Pergunta', function () {

      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/sapatilha-somoda-verniz-feminina-nude-O14-0092-203')

      // Create an Alias for ajax reviews request as @getReviews
      cy.route('GET', /.+\/reviews-2\?.+/).as('getReviews')

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
                .should('have.length', 12) // 12 because btn load more and Logo are children
                .eq(3).should('have.class', 'hide')

              // click on the button to show more reviews
              cy.get('[data-reviews-button]').click()

              // Check if the hidden reviews were shown
              cy.get('.detail-content [data-reviews-list]')
                .children()
                .eq(3).should('not.have.class', 'hide')

              // click on the button to load more reviews
              cy.get('[data-reviews-button]').click()

              // Wait get reviews request to end and check if more reviews were loaded
              cy.wait('@getReviews')

              // Check if there are 20 reviews in the modal
              cy.get('.detail-content [data-reviews-list]')
                .children()
                .should('have.length', 23)

              // Click on close modal button and check if it is closed
              cy.get('[data-slide-push-close="reviews"]').click()
              cy.wrap($modal).should('not.have.class', 'open')
            })
        })

      cy.get('#evaluation')
        .contains('AVALIAÇÃO DO PRODUTO')
        // Get reviews Avaluation container
        .then(() => {
          // Create Alias for ajax submit question Request Route
          cy.route('POST', /.+\/widget\/questions/).as('submitQuestion')

          // Click on button to open modal QAndA
          cy.get('#q-and-a-btn-modal').click()

          // Check if the modal and overlay is shown
          cy.get('#modal-reviews-overlay')
            .should('have.class', 'active')
          cy.get('#modal-reviews-question')
            .should('not.have.class', 'hide')

          // Create alias for button submit form as @btnSubmitQAndA and click on it
          cy.get('#review-qea-submit-btn')
            .as('btnSubmitQAndA')
            .click()

          // Get the error alert messages and check if it is correct
          cy.get('.q-and-a__container--alert:not(hide)').each(($el, $index) => {
            expect($el.children).to.have.length(2)
            if ($index === 0) expect($el).to.contain('Digite uma pergunta.')
            if ($index === 1) expect($el).to.contain('O campo e-mail é obrigatório.')
          });

          // create a random number to send a Unique Question
          // because the API does not accept the same question by the same email twice
          const random = Math.floor(Math.random() * 10000) + 1;

          // Get Question text area and type a valid question
          cy.get('#review-qea-question').invoke('val', `Testando ${random}`)
          // Get email input and type an Invalid Email
          cy.get('#review-qea-email').invoke('attr', 'value', `teste`)
          // Click on @btnQAndA
          cy.get('@btnSubmitQAndA').click()
          // Valid if the error message from question textarea was hidden, and a new error message for email was shown
          cy.get('.q-and-a__container--alert').each(($el, $index) => {
            expect($el.children).to.have.length(2)
            if ($index === 0) expect($el).to.have.class('hide')
            if ($index === 1) {
              expect($el).not.to.have.class('hide')
              expect($el).to.contain('Digitar um e-mail válido.')
            }
          });

          // Type a valid email
          cy.get('#review-qea-email').invoke('attr', 'value', `teste@teste.com.br`)

          // Click on @btnQAndA to send the request
          cy.get('@btnSubmitQAndA').click()

          // Wait for submit question request to respond
          cy.wait('@submitQuestion')
          // Check if the form question is hidden
          cy.get('.q-and-a__form').should('have.class', 'hide')

          // Check if the Success response was shown
          cy.get('q-and-a__return')
            .should('not.have.class', 'hide')
            .within(($content) => {
              // Check the message success content
              cy.get('h4').should('contain', 'Sua pergunta foi enviada!')
              // Click send a new question Button
              cy.get('#review-qea-return-btn')
                .should('contain', 'Fazer outra pergunta')
                .click()

              // check if the return message is hidden
              expect($content).have.class('hide')
            })

          // check if the question input container is visible
          cy.get('.q-and-a__form').should('not.have.class', 'hide')
        })

    })


    it('Validar Tooltip para MktPlace', function () {
      // Visit a new SKU page
      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/sapatenis-de-couro-cinza-manchado-com-solado-em-borracha-e-fechamento-em-velcro-cinza-L30-0034-010');

      // Get the MarketPlace tooltip info an check if it is visible
      cy.get('.mktplacetooltip.optMkt')
        .should('be.visible')
      cy.get('span.mktplacetooltiptext')
        .should('exist')
    });

    it('Validar Modelo Veste', function () {
      // Visit a new Product Page
      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/camiseta-lacoste-manga-longa-decote-v-feminina-branco-D66-1342-014')

      // Validate if the model wear content is visible
      cy.get('.model__wear').should('not.have.class', 'hide')
    })

    it('Adicionar/Remover Produto a Wishlist', function () {

      cy.route('POST', /.+\/login/).as('doLogin')
      cy.route('GET', /.+\/wishlist\/add\/\d{3}\-\d{4}\-\d{3}/).as('addWishlist')
      cy.route('GET', /.+\/wishlist\/delete\/\d{3}\-\d{4}\-\d{3}/).as('deleteWishlist')

      cy.get('.wishlist__heart')
        .click()

      cy.get('#username').type('akns@mailinator.com');
      cy.get('#password').type('123456');
      cy.get('#login-button').click();

      cy.wait('@doLogin')

      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/camiseta-lacoste-manga-longa-decote-v-feminina-branco-D66-1342-014')

      cy.get('.wishlist__heart')
        .click()

      cy.wait('@addWishlist')

      cy.get('.my-wishlist .my__wishlist--icon')
        .click()

      cy.location()
        .should(loc => {
          expect(loc.pathname).to.match(/\/wishlist/)
        })

      cy.get('.wishlist__items-list_item[code="D66-1342-014"]')
        .should('be.visible')

      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/camiseta-lacoste-manga-longa-decote-v-feminina-branco-D66-1342-014')

      cy.get('#buy-button-wrapper .wishlist__heart__logo')
        .should('have.class', 'ns-icon-wishlist-heart-active')
        .click()

      cy.wait('@deleteWishlist')

      cy.get('#buy-button-wrapper .wishlist__heart__logo')
        .should('not.have.class', 'ns-icon-wishlist-heart-active')

    });

  });
});