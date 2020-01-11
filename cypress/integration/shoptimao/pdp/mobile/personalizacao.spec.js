describe('Teste E2E PDP - ShopTimao HMG Mobile', () => {

    context('Personalização de camiseta - Mobile', function () {
      beforeEach(() => {
        cy.visit('http://local.shoptimao.com.br:3000/camisa-corinthians-libertados-masculina-branco-D65-1134-014')
      })
    
      it('Camiseta - Mobile', () => {
  
        cy.wait(5000)
        cy.get('#content #buy-box .cfs').click() 
        
        cy.wait(5000)
        cy.get('section.color-flavor-size-content .container-color .product__color--list li:first-child').click()
        
        cy.wait(10000)
        cy.get('.product__size--list > li:nth-child(3) a').click()
        
        cy.wait(5000)
        cy.get('.product__color--selected span[data-slide-push-close="selector-content-cfs"]').click()

        cy.wait(5000)
        cy.get('#buy-box .container__persona button.personalization__button').click()

        cy.wait(5000)
        cy.get('[data-step-number="1"] [builder-combo-step="1"] [builder-combo-step="1"]')
          .find('input[qa-automation][name="Nome"]')
          .invoke('attr', 'value', 'Ivan Drago')
          .should('have.value', 'Ivan Drago')
        
        cy.wait(300)
        cy.get('[data-step-number="1"] [builder-combo-step="1"] [builder-combo-step="1"]')
          .find('input[qa-automation][name="Número"]')
          .invoke('attr', 'value', '1')
          .should('have.value', '1')

          cy.wait(5000)
          cy.get('div#buy-button-wrapper.block.buy-button-wrapper.if-available').eq(0).click()
  
      })
    })
  })
    