describe('Teste E2E PDP - Netshoes HMG Desktop', () => {

  context('Personalização de chuteira - Desktop', function () {

    beforeEach(() => {
      cy.visit('http://hmg-netshoes-com-br.ns2online.com.br/chuteira-futsal-umbro-stratus-pro-preto+verde+limao-D21-0690-048')
    })
  
    it('Pé esquerdo e direito - Desktop', () => {
      
      // inicio
      cy.wait(5000)
      cy.get('.product-sku-selector .sku-select .radio-options li:nth-child(3)').click()	
      
      cy.wait(5000)
      cy.get('.product-size-selector .radio-options li:nth-child(3)').click()	
      
      cy.wait(10000)
      cy.get('.personalization__toggle-button').click()	


      // Passo 1 Pé Esquerdo – Lado Interno
  
      // bandeira
      cy.wait(300)
      cy.get('[data-step-number="1"] #step-persona-combo').select('Bandeira')
      
      cy.get('[data-step-number="1"] .builder-combo__content.active ul.swiper-wrapper li:nth-child(1)').click()

      // nome
      cy.wait(300)
      cy.get('[data-step-number="1"] #step-persona-combo').select('Nome')

      cy.get('div[builder-combo-step="1"].active')
        .find('input[qa-automation][name="Nome"]')
        .invoke('attr', 'value', 'Balboa')
        .should('have.value', 'Balboa')

      cy.get('[builder-combo-step="1"] [qa-automation="pdp-personalization-colors"] label').eq(2).click()

      // numero
      cy.wait(300)
      cy.get('[data-step-number="1"] #step-persona-combo').select('Número')

      cy.get('div[builder-combo-step="1"].active')
        .find('input[qa-automation][name="Número"]')
        .invoke('attr', 'value', '40')
        .should('have.value', '40')

      cy.get('[builder-combo-step="1"] [qa-automation="pdp-personalization-colors"] label').eq(15).click()

      cy.get('.builder__controls__btn.builder__controls__btn--next').click()


      // Pé Esquerdo – Lado Externo
      cy.wait(3000)

      // bandeira
      cy.wait(300)
      cy.get('[data-step-number="2"] #step-persona-combo').select('Bandeira')

      cy.get('[data-step-number="2"] .builder-combo__content.active ul.swiper-wrapper li:nth-child(2)').click()

      // nome
      cy.wait(300)
      cy.get('[data-step-number="2"] #step-persona-combo').select('Nome')

      cy.get('div[builder-combo-step="2"].active')
        .find('input[qa-automation][name="Nome"]')
        .invoke('attr', 'value', 'Stallone cobra')
        .should('have.value', 'Stallone cobra')

      cy.get('[builder-combo-step="2"] [qa-automation="pdp-personalization-colors"] label').eq(3).click()

      // numero
      cy.wait(300)
      cy.get('[data-step-number="2"] #step-persona-combo').select('Número')

      cy.get('div[builder-combo-step="2"].active')
        .find('input[qa-automation][name="Número"]')
        .invoke('attr', 'value', '39')
        .should('have.value', '39')

      cy.get('[builder-combo-step="2"] [qa-automation="pdp-personalization-colors"] label').eq(14).click()

      cy.get('.builder__controls__btn.builder__controls__btn--next').click()

      // Pé Esquerdo – Lado Externo
      cy.wait(3000)

      // bandeira
      cy.wait(300)
      cy.get('[data-step-number="3"] #step-persona-combo').select('Bandeira')

      cy.get('[data-step-number="3"] .builder-combo__content.active ul.swiper-wrapper li:nth-child(3)').click()

      // nome
      cy.wait(300)
      cy.get('[data-step-number="3"] #step-persona-combo').select('Nome')

      cy.get('div[builder-combo-step="3"].active')
        .find('input[qa-automation][name="Nome"]')
        .invoke('attr', 'value', 'Rocky Balboa')
        .should('have.value', 'Rocky Balboa')

      cy.get('[builder-combo-step="3"] [qa-automation="pdp-personalization-colors"] label').eq(5).click()

      // numero
      cy.wait(300)
      cy.get('[data-step-number="3"] #step-persona-combo').select('Número')

      cy.get('div[builder-combo-step="3"].active')
        .find('input[qa-automation][name="Número"]')
        .invoke('attr', 'value', '38')
        .should('have.value', '38')

      cy.get('[builder-combo-step="3"] [qa-automation="pdp-personalization-colors"] label').eq(15).click()

      cy.get('.builder__controls__btn.builder__controls__btn--next').click()

      // Pé Direito – Lado Interno
      cy.wait(3000)

      // bandeira
      cy.wait(300)
      cy.get('[data-step-number="4"] #step-persona-combo').select('Bandeira')

      cy.get('[data-step-number="4"] .builder-combo__content.active ul.swiper-wrapper li:nth-child(3)').click()

      // nome
      cy.wait(300)
      cy.get('[data-step-number="4"] #step-persona-combo').select('Nome')

      cy.get('div[builder-combo-step="4"].active')
        .find('input[qa-automation][name="Nome"]')
        .invoke('attr', 'value', 'Stallone cobra')
        .should('have.value', 'Stallone cobra')

      cy.get('[builder-combo-step="4"] [qa-automation="pdp-personalization-colors"] label').eq(5).click()

      // numero
      cy.wait(300)
      cy.get('[data-step-number="4"] #step-persona-combo').select('Número')

      cy.get('div[builder-combo-step="4"].active')
        .find('input[qa-automation][name="Número"]')
        .invoke('attr', 'value', '39')
        .should('have.value', '39')

      cy.get('[builder-combo-step="4"] [qa-automation="pdp-personalization-colors"] label').eq(14).click()

      //cy.get('.builder__controls__btn.builder__controls__btn--next').click()

      cy.wait(3000)
      cy.get('#buy-button-wrapper .buy-button-now').eq(0).click()
       
    })
  }) 

  
  context('Personalização de camiseta - Desktop', function () {
    beforeEach(() => {
      cy.visit('https://hmg-netshoes-com-br.ns2online.com.br/camisa-selecao-brasil-ii-2018-sn-torcedor-nike-feminina-azul-D12-9561-030')
    })
  
    it('Camiseta feminina - Desktop', () => {

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
