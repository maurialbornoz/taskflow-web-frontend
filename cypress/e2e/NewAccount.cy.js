/// <reference types="cypress"/>

describe('New Account', () => {
    it('<NewAccount/> - Input validations, alerts and new account creation', () => {
        cy.visit('/new-account')

        cy.get('[data-cy=submit-new-account]').click()
        
        cy.get('[data-cy=alert]')
        .should('exist')
        .invoke('text')
        .should('equal', 'All fields are required')
        
        cy.get('[data-cy=alert]')
        .should('have.class', 'alert-error')
        
        cy.get('[data-cy=name-input]').type('Username')
        cy.get('[data-cy=email-input]').type('user@mail.com')
        cy.get('[data-cy=password-input]').type('123', {delay:100})
        cy.get('[data-cy=confirm-password-input]').type('123')
        
        cy.get('[data-cy=submit-new-account]').click()
        
        cy.get('[data-cy=alert]')
        .should('exist')
        .invoke('text')
        .should('equal', 'The password should have at least 6 characters')
        
        cy.get('[data-cy=alert]')
        .should('have.class', 'alert-error')
        
        cy.get('[data-cy=password-input]').clear().type('123456')
        cy.get('[data-cy=confirm-password-input]').clear().type('1234567')
        cy.get('[data-cy=submit-new-account]').click()
        
        cy.get('[data-cy=alert]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Passwords are different')
        
        cy.get('[data-cy=alert]')
        .should('have.class', 'alert-error')
        
        cy.get('[data-cy=confirm-password-input]').clear().type('123456')
        cy.get('[data-cy=submit-new-account]').click()
        
        cy.get('[data-cy=select-project]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Select a project')
        
        cy.get('[data-cy=hello-user')
        .should('exist')
        
        cy.wait(200)

        cy.get('[data-cy=log-out')
        .should('exist')
        .click()
    })

    it('New Account - Check duplicated users', () => {
        cy.visit('/new-account')
        
        cy.get('[data-cy=name-input').type('Username')
        cy.get('[data-cy=email-input').type('user@mail.com')
        cy.get('[data-cy=password-input').type('123456')
        cy.get('[data-cy=confirm-password-input').type('123456')
        cy.get('[data-cy=submit-new-account').click()

                
        cy.get('[data-cy=alert')
        .should('exist')
        .invoke('text')
        .should('equal', 'Email is already registered')
        
        cy.get('[data-cy=alert')
        .should('have.class', 'alert-error')
        
    })
})
