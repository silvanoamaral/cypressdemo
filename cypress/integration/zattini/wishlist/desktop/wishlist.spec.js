describe('Teste E2E Wishlist - Zattini HMG', () => {
  context('Wishlist pdp', function () {
    it('Visitar PDP e adicionar produto ao wishlist', () => {
      cy.visit('https://hmg-zattini-com-br.ns2online.com.br/bota-gonew-fenix-20-bege-C62-1065-224');
      cy.wait(1500);

      cy.get('.wishlist').click();

      cy.wait(5000);

      cy.get('#username').type('ns.teste.qa.marcelo@gmail.com');
      cy.get('#password').type('123456');
      cy.get('#login-button').click();

      cy.wait(10000).then(() => {
        cy.get('a.trigger.my__wishlist--icon').click();
        cy.wait(1500);

        // remove x
        cy.get('span.wishlist__items-list_item_remove').should('be.visible');

        // img
        cy.get('div.wishlist__items-list_item img').should('be.visible');

        // product name
        cy.get('div.wishlist__items-list_item_name span').should('be.visible');

        // product price
        cy.get('div.price.normal').should('be.visible');
        cy.get('span.numberOfInstallments').should('be.visible');
        cy.get('span.amountInCents').should('be.visible');

        // size combo box
        cy.get('div.wishlist__items-list_item_sizes select').should('be.visible');

        // button
        cy.get('button.wishlist__items-list_item_buy_btn').should('be.visible');

        // select size
        cy.get('div.wishlist__items-list_item_sizes select').select('37');

        // click add to cart button
        cy.get('button.wishlist__items-list_item_buy_btn').click();
      });
    })
  })
})
