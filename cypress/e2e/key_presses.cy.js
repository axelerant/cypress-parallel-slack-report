// In order to handle tabbing, use this library: https://github.com/kuceb/cypress-plugin-tab
describe('Key Presses', () => {
  it('Verify key presses', () => {
    cy.visit('/key_presses');
    cy.log("Type 'Hello' then click backspace key")
      .get('#target')
      .type('Hello{backspace}');
    cy.get('#result').should('have.text', 'You entered: BACK_SPACE');
  });
});
