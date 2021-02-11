describe('Image upload', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('should have a input button of type file', () => {
        cy.get('input[data-cy=file_input]').click();
        });

    it('should be able to choose file', () => {
        cy.get('input[data-cy=file_input]').click();
        cy.get('[data-cy="file_upload"]').should('not.exist');
        });

    it('should be able to upload a file of size 28x28', () => {
        const fixtureFile = 'test_file.jpg';
        cy.get('input[data-cy=file_input]').attachFile(fixtureFile);
        cy.get('[data-cy="file_upload"]').should('exist');
        cy.get('[data-cy="file_upload"]').click();
        });

    it('should be not be able to upload a file of size greater than 28x28', () => {
        const fixtureFile = 'test_file_unsupported.PNG';
        cy.get('input[data-cy=file_input]').attachFile(fixtureFile);
        cy.get('[data-cy="file_upload"]').should('exist');
        cy.get('[data-cy="file_upload"]').click();
        cy.wait(200);
        cy.on('window:alert', (txt) => { expect(txt).to.contains('Please select an image of dimensions 28x28') });
        });
})