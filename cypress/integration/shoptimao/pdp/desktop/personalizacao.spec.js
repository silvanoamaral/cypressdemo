describe('Teste E2E PDP - ShopTimao HMG Desktop', () => {

  context('Personalização de camiseta - Desktop', function () {
    beforeEach(() => {
      cy.visit('https://hmg-shoptimao-com-br.ns2online.com.br/camisa-corinthians-libertados-masculina-branco-D65-1134-014')
    })
  
    it('Camiseta - Desktop', () => {
                  
      cy.wait(5000)
      cy.get('.product-sku-selector .radio-options li:first-child').click()	

      cy.wait(2000)
      cy.get('.product-size-selector .radio-options li:first-child').click()		
      
      cy.wait(5000)
      cy.get('.personalization__toggle-button').click()	
     
      cy.wait(300)
      cy.get('[data-step-number="1"] [builder-combo-step="1"] [builder-combo-step="1"]')
        .find('input[qa-automation][name="Nome"]')
        .invoke('attr', 'value', 'Ivan Drago')
        .should('have.value', 'Ivan Drago')

      cy.wait(300)
      cy.get('[data-step-number="1"] [builder-combo-step="1"] [builder-combo-step="1"]')
        .find('input[qa-automation][name="Número"]')
        .invoke('attr', 'value', '22')
        .should('have.value', '22')
      
      cy.wait(5000)
      cy.get('div#buy-button-wrapper.block.buy-button-wrapper.if-available').eq(0).click()

    })
  })
})
  