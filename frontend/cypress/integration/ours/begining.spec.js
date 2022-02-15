/// <reference types="cypress" />
describe('beging', () => {
    beforeEach(() => {
        cy.visit('http://localhost/')
    })

    it('Should have a login button', () => {
        cy.get('.css-2uchni > .MuiButtonBase-root > .material-icons')
    })

    it('Should have a zoom in button', () => {
        cy.get('[aria-label="Zoom in"]')
    })

    it('Should have a logo Text', () => {
        cy.get('.css-1083xa6-MuiTypography-root')
    })
})