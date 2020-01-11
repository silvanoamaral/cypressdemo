describe('PDP - Standard Flow', function () {
  context('PDP - Desktop', function () {
    // Executed once before beginning tests
    before(function () {
      cy.visit('https://hmg-shoestock-com-br.ns2online.com.br/bota-couro-shoestock-curta-enrugada-feminina-preto-O01-0264-006');

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
      cy.get('[chaordic="top"]')
      // Get Middle div for chaordic
      cy.get('[chaordic="middle"]')
      // Get Bottom div for chaordic
      cy.get('[chaordic="bottom"]')

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
        .eq(0).click()

      // Wait for new SKU ajax request to end
      cy.wait('@ajaxPdpShowcase')

      // Check if the selected sku has class active
      cy.get('.product-sku-selector [data-type="color"] li:not(".unavailable")')
        .eq(0).should('have.class', 'active')

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
      cy.get('ul.radio-options[data-type="size"] li:not(.unavailable)')
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


    it('Validar Reviews & Enviar Pergunta', function () {

      cy.visit('https://hmg-shoestock-com-br.ns2online.com.br/bota-couro-montaria-shoestock-bico-fino-feminina-preto-O01-0270-006')
      // Create an Alias for ajax reviews request as @getReviews
      cy.route('GET', /.+\/reviews\?.+/).as('getReviews')

      // Check if exists a Reviews content
      cy.get('#reviews')
        .children()
        .should('have.length', 3)
        .within(($content) => {

          // Title must have avaliações de clientes
          cy.wrap($content).first()
            .should('contain', 'avaliações de clientes')

        })

      // Check if the length of reviews-list is not Zero
      cy.get('[data-js="reviews-list"]')
        .children()
        .should('not.have.length', 0)
    })

  });
});