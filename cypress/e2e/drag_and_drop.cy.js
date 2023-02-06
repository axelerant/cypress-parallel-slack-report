// Use DataTransfer object in order to take data from one place and put it in another.
describe('Drag and Drop', () => {
  const dataTransfer = new DataTransfer();
  it('Drag and drop', () => {
    cy.visit('/drag_and_drop');
    cy.log('Mouse drag and drop with data transfer');
    cy.contains('A').trigger('dragstart', { dataTransfer });
    cy.contains('B').trigger('drop', { dataTransfer });
  });
});
