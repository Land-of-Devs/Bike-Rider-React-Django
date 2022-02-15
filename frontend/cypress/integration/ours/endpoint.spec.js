/// <reference types="cypress" />
describe('beging', () => {
    before(() => {
        cy.visit('/')
    })
    
    after(() => {
        cy.get('[data-testid="CloseIcon"] > path').click()
        cy.get('.MuiAvatar-root').click()
        cy.get(':nth-child(4) > .MuiTypography-root').click()
        cy.get('.css-2uchni > .MuiButtonBase-root > .material-icons')
    })

    it('Should login successfully', () => {
        cy.get('.css-2uchni > .MuiButtonBase-root > .material-icons').click()
        cy.get('#mui-1').type('12345678Z')
        cy.get('#mui-2').type('admin')
        cy.get('.MuiButton-root').click()
        cy.get('.MuiSnackbar-root > .MuiPaper-root')
        cy.get('.MuiAvatar-root')
        cy.request('/api/stations/client')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.results.length).to.be.at.least(0)
            })
    })
})