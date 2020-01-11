describe('PDP - Standard Flow', function () {
  context('PDP - Desktop', function () {
    // Executed once before beginning tests
    before(function () {
      cy.visit('https://hmg-netshoes-com-br.ns2online.com.br/bota-gonew-fenix-20-bege-C62-1065-224');

    })

    // Executed every time before beginning each test
    beforeEach(function () {
      // Create alias for Route Ajax Product Info
      cy.server();
      cy.route('GET', /.+\/refactoring\/[\w\-]+(\w{3}\-\w{4}\-\w{3}(\-\w{2})?)$/).as('ajaxPdpShowcase')
    })


    it('Verificar Exibição da Imagem, Preço e Nome do Produto', function () {

      // Get product main Image and check if there is a src attribute with a product image url
      cy.get('section.photo figure.photo-figure img[data-modal-trigger="photo-modal"]')
        .invoke('attr', 'src')
        .should(($src) => {
          expect($src).to.match(/\w{3}\-\w{4}\-\w{3}_zoom1\./)
        });

      // Verify if the caroussel of Product Images are not empty
      cy.get('section.photo [data-swiper-wrapper-thumbs]').should(($list) => {
        expect($list).to.have.descendants('li')
        expect($list.children.length).to.be.greaterThan(0)
      });

      // Check if the price is not empty
      cy.get('.default-price strong[itemprop="price"]')
        .should('not.be.empty')

      // Check if the product name is not empty
      cy.get('.short-description h1[itemprop="name"]')
        .should('not.be.empty')

    });


    it('Carrossel de imagens & Seleção de imagem & Modal de Zoom', function () {

      // Save alias for Main Product image in the page as @mainImage
      cy.get('figure.photo-figure img.zoom').as('mainImage')

      // Get images caroussel container
      cy.get('.showcase .photo [data-slider-wrapper="simplePagination"]')
        .within(() => {
          // Save alias for third image in the caroussel as @refImage	
          cy.get('[data-index="2"]').as('refImage')

          // Double click to go forward two images ahead in swiper caroussel &
          // check if the @refImage has the class that supposed to have
          cy.get('.swiper-button-next')
            .dblclick()
          cy.get('@refImage').should('have.class', 'swiper-slide-active')

          // Click to go back one image behind in swiper caroussel
          // check if the @refImage has the class that supposed to have
          cy.get('.swiper-button-prev')
            .click()
          cy.get('@refImage').should('have.class', 'swiper-slide-next')

          // Click the @refImage in the caroussel and
          // check if the @mainImage src chaged as expected
          cy.get('@refImage').click()
          cy.get('@mainImage').invoke('attr', 'src')
            .should('include', 'zoom3')

        })

      // Click on the @mainImage and check if the Modal Zoom Opens
      // then check its functionalities
      cy.get('@mainImage').click()
      cy.get('.showcase .photo-modal[data-modal-target="photo-modal"]')
        .should('have.class', 'tingle-modal--visible')
        .within(($modal) => {
          // Create alias for main Image Zoomed in the modal
          cy.get('.photo-figure img').as('imageZoomed')

          // Get the swiper Caroussel images in the modal and check its functionalities
          cy.get('[data-slider-wrapper="simplePagination"]')
            .within(() => {
              // Save alias for third image in the caroussel as @refModalImage
              cy.get('[data-index="1"]').as('refModalImage')

              // Double click to go forward two images ahead in swiper caroussel &
              // check if the @refModalImage has the class that supposed to have
              cy.get('.swiper-button-next')
                .dblclick()
              cy.get('@refModalImage').should('have.class', 'swiper-slide-prev')

              // Click to go back one image behind in swiper caroussel
              // check if the @refModalImage has the class that supposed to have
              cy.get('.swiper-button-prev')
                .click()
              cy.get('@refModalImage').should('have.class', 'swiper-slide-active')

              // Click the @refModalImage in the caroussel and
              // check if the @imageZoomed src chaged as expected
              cy.get('@refModalImage').click()
              cy.get('@imageZoomed').invoke('attr', 'src')
                .should('include', 'zoom2')

            })

          // Get Modal Close Button, click on it and Verify if the modal is closed
          cy.get('button.modal-close').click()
          cy.wrap($modal).should('not.have.class', 'tingle-modal--visible')
        })
    });

    it('Verifica Espaços para Chaordic', function () {
      // Get Top div for chaordic
      cy.get('[data-recommendation-section="top"]')
      // Get Middle div for chaordic
      cy.get('[data-recommendation-section="middle"]')
      // Get Bottom div for chaordic
      cy.get('[data-recommendation-section="bottom"]')

    });

    it('Selecionar Produto Inválido & Validar Formulário Tell Me', function () {

      // Create an Alias for route Tell-Me as @ajaxTellMe
      cy.route('POST', /.+\/tell\-me/).as('ajaxTellMe')

      // Get Sku Selector Buttons and click on an unavailable Sku
      cy.get('.product-sku-selector .radio-options')
        .within(() => {
          cy.get('.unavailable').first().click()
        })
      cy.wait('@ajaxPdpShowcase')

      // Select Tell me container
      cy.get('.tell-me-button-wrapper')
        .within(() => {

          // Create Alias for send tell me button as @btnForm and Input Containers as @inputContainer
          cy.get('form button.tell-me-button').as('btnForm')
          cy.get('div.tooltip-item').as('inputContainer')

          // Verify if there is a text informing product unavailable
          cy.get('.title').contains('Produto indisponível')

          // click @btnForm and check if the error messages are shown and correct
          cy.get('@btnForm').click()
          cy.get('@inputContainer').each(($el, $index) => {
            expect($el.children).to.have.length(2)
            if ($index == 0) expect($el.last()).to.contain('Digite um Nome válido')
            if ($index == 1) expect($el.last()).to.contain('O campo E-mail é obrigatório.')
          })

          // Get input Name and type a value not valid
          cy.get('input#name')
            .invoke('attr', 'value', 'Teste')
          // Get input Email and type a value not valid
          cy.get('input#email')
            .invoke('attr', 'value', 'testeteste')

          // Click @btnForm and check if the error messages are shown and correct
          cy.get('@btnForm').click()
          cy.get('@inputContainer').each(($el, $index) => {
            expect($el.children).to.have.length(2)
            if ($index === 0) expect($el.last()).to.contain('O campo Nome precisa ter pelo menos 8 caracteres.')
            if ($index === 1) expect($el.last()).to.contain('E-mail inválido.')
          });

          // Get input Name and type a valid Value
          cy.get('input#name')
            .invoke('attr', 'value', 'Testando')
            .trigger('change')
          // Get input Email and type a valid Value
          cy.get('input#email')
            .invoke('attr', 'value', 'teste@mailinator.com')
            .trigger('change')

          // Click @btnForm and check if the success messages are shown and correct
          cy.get('@btnForm').click()
          cy.wait('@ajaxTellMe')
          cy.get('[data-tell-me-feedback]').children('.tell-me-feedback.success').should('contain', 'Pronto, em breve te avisaremos.')
        });
    });

    it('Validar sem SKU selecionado - Botão Comprar', function () {

      // Get a Available SKU and Select
      cy.get('.product-sku-selector .radio-options')
        .find('li:not(".unavailable")')
        .eq(1).click()

      // Wait for new SKU ajax request to end
      cy.wait('@ajaxPdpShowcase')

      // Check if the selected sku has class active
      cy.get('.product-sku-selector [data-type="color"] li:not(".unavailable")')
        .eq(1).should('have.class', 'active')

      // Get Buy Button and click on it
      cy.get('#buy-button-now')
        .click()

      // Verify if the error message is shown
      cy.get('#buy-button-wrapper > #buy-error').should('contain', 'Selecione o tamanho')

    });


    it('Validar Botão Comprar com SKU Selecionado', function () {

      // create a variable to storage selected SKU
      let skuSelected;

      // Declare and create an alias for cart-add ajax as @ajaxAddToCart
      cy.route('POST', /.+\/cart\/add/).as('ajaxAddToCart')

      // Get an available size and click on it
      cy.get('ul.radio-options[data-type="size"] li')
        .eq(1)
        .click()

      // Wait for new SKU ajax request to end
      cy.wait('@ajaxPdpShowcase')

      cy.get('[data-product-sku*="-"]').then(($skuSelected) => {
        // Set a value with selected sku for the variable
        skuSelected = $skuSelected.data('product-sku');

        // Get buy button and click on it
        cy.get('#buy-button-now')
          .click()

        // Wait for request cart-add and check if redirect to /cart
        cy.wait('@ajaxAddToCart');
        cy.location().should(loc => {
          expect(loc.pathname).to.match(/\/(novo\-)?cart/)
        })

        // verify if the sku selected is infact the sku add to the cart
        cy.get('.table-products tbody input[name="product-sku"]')
          .invoke('attr', 'value')
          .should('eq', skuSelected);
      })

    });

    it('Validar Tooltip para MktPlace', function () {
      // Visit a new SKU page
      cy.visit('https://hmg-netshoes-com-br.ns2online.com.br/camiseta-speedo-basic-interlock-com-protecao-uv-masculina-preto-146-0109-006');

      // Get the MarketPlace tooltip info an check if it is visible
      cy.get('.mktplacetooltip.optMkt')
        .should('be.visible')
      cy.get('span.mktplacetooltiptext')
        .should('exist')
    });

    it('Validar Reviews & Enviar Pergunta', function () {

      // Create an Alias for ajax reviews request as @getReviews
      cy.route('GET', /.+\/reviews-2\?.+/).as('getReviews')

      // Check if there is the Customer Feedback and avaluation container in the reviews section
      cy.get('#reviews').children().should('have.length', 2)

      // Get the reviews Customer FeedBack container
      cy.get('.reviews__customerFeedback').then(() => {
        // Click on button reviews to open Modal
        cy.get('[data-reviews-button]').click()

        // Validate if the modal is openned
        cy.get('.reviews__modal')
          .should('not.have.class', 'hide')
          .then(($modal) => {

            // Check if there are 10 reviews in the modal
            cy.get('.reviews__modal .reviews__feedback').children().should('have.length', 10)

            // click on the button to load more reviews
            cy.get('[data-reviews-button-loadmore]').click()

            // Wait get reviews request to end and check if more reviews were loaded
            cy.wait('@getReviews')
            cy.get('.reviews__modal .reviews__feedback').children().should('have.length', 11)
              .last().children().should('have.length', 10)

            // Click on close modal button and check if it is closed
            cy.get('.reviews__modal-container-content-head-close').click()
            cy.wrap($modal).should('have.class', 'hide')
          })
      })

      // Get reviews Avaluation container
      cy.get('.reviews__productAvaliation').within(() => {

        // Create Alias for ajax submit question Request Route
        cy.route('POST', /.+\/widget\/questions(\?.+)?/).as('submitQuestion')

        // Create alias for button submit question as @btnQAndA
        cy.get('#review-qea-submit-btn').as('btnQAndA')

        // Click on @btnQAndA and check if the error messages were shown
        cy.get('@btnQAndA').click()
        cy.get('.q-and-a__container--alert:not(hide)').each(($el, $index) => {
          expect($el.children).to.have.length(2)
          if ($index === 0) expect($el).to.contain('Digite uma pergunta.')
          if ($index === 1) expect($el).to.contain('O campo e-mail é obrigatório.')
        });

        // create a random number to send a Unique Question
        // because the API does not accept the same question by the same email twice
        const random = Math.floor(Math.random() * 1000) + 1;

        // Get Question text area and type a valid question
        cy.get('#review-qea-question').invoke('val', `Testando ${random}`)
        // Get email input and type an Invalid Email
        cy.get('#review-qea-email').invoke('attr', 'value', `teste`)
        // Click on @btnQAndA
        cy.get('@btnQAndA').click()
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
        cy.get('@btnQAndA').click()

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

    it('Validar Modelo Veste', function () {
      // Visit a new Product Page
      cy.visit('https://hmg-netshoes-com-br.ns2online.com.br/camiseta-lacoste-manga-longa-decote-v-feminina-branco-D66-1342-014')

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

      cy.visit('https://hmg-netshoes-com-br.ns2online.com.br/camiseta-lacoste-manga-longa-decote-v-feminina-branco-D66-1342-014')

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

      cy.visit('https://hmg-netshoes-com-br.ns2online.com.br/camiseta-lacoste-manga-longa-decote-v-feminina-branco-D66-1342-014')

      cy.get('#buy-button-wrapper .wishlist__heart__logo')
        .should('have.class', 'ns-icon-wishlist-heart-active')
        .click()

      cy.wait('@deleteWishlist')

      cy.get('#buy-button-wrapper .wishlist__heart__logo')
        .should('not.have.class', 'ns-icon-wishlist-heart-active')

    });

  });
});