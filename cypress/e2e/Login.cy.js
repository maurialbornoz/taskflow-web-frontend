/// <reference types="cypress"/>


describe('Login', () => {
    it('<Login/> - Validation & alerts', () => {
        cy.visit('/')

        cy.get('[data-cy=submit-login]').click()
        
        cy.get('[data-cy=alert]')
        .should('exist')
        .invoke('text')
        .should('equal', 'All fields are required')
        
        cy.get('[data-cy=alert]')
        .should('have.class', 'alert-error')
        
        // Check non existen user
        cy.get('[data-cy=email-input]').type('nonexistent@email.com') // user does not exist
        cy.get('[data-cy=password-input]').type('123') 

        cy.get('[data-cy=submit-login]').click()
        
        cy.get('[data-cy=alert]')
        .should('exist')
        .invoke('text')
        .should('equal', 'User does not exist')
        
        cy.get('[data-cy=alert]')
        .should('have.class', 'alert-error')
        
        // Incorrect password
        cy.get('[data-cy=email-input]').clear().type('user@mail.com')
        cy.get('[data-cy=password-input]').clear().type('123') 
        
        cy.get('[data-cy=submit-login]').click()
        
        cy.get('[data-cy=alert]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Incorrect password')
        
        cy.get('[data-cy=alert]')
        .should('have.class', 'alert-error')
        

        // Valid authentication
        cy.get('[data-cy=email-input]').clear().type('user@mail.com') // user does not exist
        cy.get('[data-cy=password-input]').clear().type('123456') 
        
        cy.get('[data-cy=submit-login]').click()
        
        cy.get('[data-cy=select-project]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Select a project')

        cy.wait(200)

        cy.get('[data-cy=log-out')
        .should('exist')
        .click()
    })
})