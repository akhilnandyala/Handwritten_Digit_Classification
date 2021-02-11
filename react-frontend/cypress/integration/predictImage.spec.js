describe('Image predict', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('should be able to predict an suitable uploaded image', () => {
        const fixtureFile = 'test_file';
        cy.get('input[data-cy=file_input]').attachFile(fixtureFile);
        cy.get('[data-cy="file_upload"]').should('exist');
        cy.get('[data-cy="file_upload"]').click();
        cy.get('[data-cy="file_predict"]').click();
        cy.get('.prediction_container').contains('value: 3');
        });
});