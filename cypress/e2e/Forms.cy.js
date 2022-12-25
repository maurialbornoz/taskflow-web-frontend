/// <reference types="cypress"/>


describe('Forms', () => {
  it('<Login/> - Check login page', () => {
    cy.visit('/')
    cy.get('[data-cy=title]')
      .invoke('text')
      .should('equal', 'Log In')

    // Check that the form exists
    cy.get('[data-cy=form-login]').should('exist')
    
    // Check inputs
    cy.get('[data-cy=email-input]').should('exist')
    cy.get('[data-cy=password-input]').should('exist')
    cy.get('[data-cy=submit-login]')
      .should('exist')
      .should('have.value', 'Log In')
      .should('have.class', 'btn-primary')


    cy.get('[data-cy=new-account]')
      .should('exist')
      .should('have.prop', 'tagName')
      .should('eq', 'A') //equal to a link

    cy.get('[data-cy=new-account]')
      .should('have.attr', 'href')
      .should('eq', '/new-account')

    });
    
  it('<NewAccount/> - Check new account page', () => {
    cy.visit('/new-account')

    cy.get('[data-cy=title]')
      .should('exist')  
      .invoke('text')
      .should('equal', 'New Account')

    cy.get('[data-cy=new-account-form]').should('exist')
    
    cy.get('[data-cy=name-input]').should('exist')
    cy.get('[data-cy=email-input]').should('exist')
    cy.get('[data-cy=password-input]')
      .should('exist')
      .should('have.prop', 'type')
      .should('equal', 'password')
    cy.get('[data-cy=confirm-password-input]').should('exist')

    cy.get('[data-cy=submit-new-account]')
      .should('exist')
      .should('have.value', 'Sign Up')
      .should('have.class', 'btn-primary')

    cy.get('[data-cy=login-link]')
      .should('exist')
      .should('have.attr', 'href')
      .should('eq', '/')

    cy.visit('/')
  })
})