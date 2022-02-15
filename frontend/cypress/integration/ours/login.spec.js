/// <reference types="cypress" />
describe('beging', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Should login successfully', () => {
        cy.get('.css-2uchni > .MuiButtonBase-root > .material-icons').click()
        cy.get('#mui-1').type('12345678Z')
        cy.get('#mui-2').type('admin')
        cy.get('.MuiButton-root').click()
        cy.get('.MuiSnackbar-root > .MuiPaper-root')
        cy.get('.MuiAvatar-root')
    })
})