describe('Image upload', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('should have a input of type file', () => {
        cy.find('input[data-cy=file_input]')
        })
})