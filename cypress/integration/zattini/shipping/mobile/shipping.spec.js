describe('Promotion Shipping - All pages', function () {
  context('Promotion Shipping - desktop', function () {

    // Executed every time before beginning each test
    beforeEach(function () {
      cy.viewport('iphone-6')
      // Create alias for API Shipping Eligible Check
      cy.server();
      cy.route('GET', /.+\/promo\/freeshipping\/\d{8}\/eligibility/).as('ajaxEligible')
      // Create alias for API Promotion Shipping Check
      cy.route('GET', /promotion\/shipping\/\w{3}\-\w{4}\-\w{3}\-\w{2}\/sellers\/\d{1,6}\/zipCodes\/\d{8}/).as('ajaxPromoShipping')
    });

    it('Verifica Conteudo Modal', function () {
      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/')

      cy.get('.zipcode-content__text')
        .should('contain', 'Informe seu CEP')

      cy.get('[data-free-shipping-by-zipcode]')
        .click()

      cy.get('#overlay')
        .should('have.class', 'active')

      cy.get('[data-shipping-container]')
        .should('not.have.class', 'hide')
        .within(() => {
          cy.get('.zip__code-user')
            .should('not.have.class', 'hide')

          cy.get('.zip__code.ns-zipcode')
            .then(($input) => {
              expect($input).to.have.attr('placeholder', 'Insira o CEP')
            })
            .type('01504001')

          cy.get('[data-zip-code-submit]')
            .should('contain', 'Consultar')
            .click()

          cy.get('.zip__code-box')
            .should('have.class', 'hide')

          cy.get('.text__sucess')
            .should('not.have.class', 'hide')
            .should('contain', '01504-001')
        })

      cy.get('[data-zip-code-submit]')
        .should('contain', 'OK')
        .click()

      cy.wait('@ajaxEligible')

      cy.route('POST', /.+\/login/).as('doLogin')

      cy.getCookie('zipcode')
        .should('have.property', 'value', '01504001')

      cy.getCookie('fshipEligible')
        .should('have.property', 'value', 'true')

      cy.get('.zipcode-content__text')
        .should('contain', '01504-001')

      cy.get('[data-free-shipping-by-zipcode]')
        .click()

      cy.get('[data-shipping-container]')
        .should('not.have.class', 'hide')
        .then(() => {
          cy.get('.zip__code.ns-zipcode')
            .should('have.value', '01504-001')

          cy.get('[data-zip-code-submit]')
            .should('contain', 'Alterar')

          cy.get('.zip__code-user')
            .should('not.have.class', 'hide')
            .within(() => {
              cy.get('a[href="/login"]')
                .click()

            })
        })

      cy.location()
        .should(loc => {
          expect(loc.pathname).to.match(/\/login/)
        })

      cy.get('#username').type('akns@mailinator.com');
      cy.get('#password').type('123456');
      cy.get('#login-button').click();

      cy.wait('@doLogin')

      cy.getCookie('zipcode')
        .should('have.property', 'value', '01405001')

      cy.getCookie('fshipEligible')
        .should('have.property', 'value', 'true')

      cy.get('.zipcode-content__text')
        .should('contain', '01405-001')

      cy.get('[data-free-shipping-by-zipcode]')
        .click()

      cy.get('[data-shipping-container]')
        .should('not.have.class', 'hide')
        .then(() => {
          cy.get('.zip__code.ns-zipcode')
            .should('have.value', '01405-001')

          cy.get('[data-zip-code-submit]')
            .should('contain', 'Alterar')

          cy.get('.zip__code-user')
            .should('have.class', 'hide')
        })

      cy.get('#overlay')
        .click({ force: true })
        .should('not.have.class', 'active')

      cy.get('[data-shipping-container]')
        .should('have.class', 'hide')
    });

    it('Search - validar consulta Promotion-shipping', function () {
      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/busca')

      cy.get('.zipcode-content__text')
        .should('contain', 'Informe seu CEP')

      cy.get('[data-free-shipping-by-zipcode]')
        .click()

      cy.get('[data-shipping-container]')
        .within(() => {

          cy.get('.zip__code.ns-zipcode')
            .then(($input) => {
              expect($input).to.have.attr('placeholder', 'Insira o CEP')
            })
            .type('01504001')

          cy.get('[data-zip-code-submit]')
            .should('contain', 'Consultar')
            .click()

          cy.get('.text__sucess')
            .should('not.have.class', 'hide')
            .should('contain', '01504-001')
        })

      cy.get('[data-zip-code-submit]')
        .should('contain', 'OK')
        .click()

      cy.wait('@ajaxEligible')
      cy.wait('@ajaxPromoShipping')

      cy.get('.zipcode-content__text')
        .should('contain', '01504-001')
    });

    it('PDP - validar consulta Promotion-Shipping', function () {
      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/tenis-santa-lolla-cadarco-branco-H08-1353-014')

      cy.get('.zipcode-content__text')
        .should('contain', 'Informe seu CEP')

      cy.get('[data-free-shipping-by-zipcode]')
        .click()

      cy.get('[data-shipping-container]')
        .within(() => {

          cy.get('.zip__code.ns-zipcode')
            .then(($input) => {
              expect($input).to.have.attr('placeholder', 'Insira o CEP')
            })
            .invoke('attr', 'value', '01504001')
            .trigger('change')

          cy.get('[data-zip-code-submit]')
            .should('contain', 'Consultar')
            .click()

          cy.get('.text__sucess')
            .should('not.have.class', 'hide')
            .should('contain', '01504-001')
        })

      cy.get('[data-zip-code-submit]')
        .should('contain', 'OK')
        .click()

      cy.wait('@ajaxEligible')
      cy.wait('@ajaxPromoShipping')

      cy.get('.zipcode-content__text')
        .should('contain', '01504-001')

      cy.get('.freeDelivery-container .freeDelivery-gif')
        .should('have.class', 'hide')
    });

  });
});