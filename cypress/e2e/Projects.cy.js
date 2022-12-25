/// <reference types="cypress"/>


describe('Management', () => {
    it('<Login/> - Authentication', () => {
        cy.visit('/')

        //
        cy.get('[data-cy=email-input]').type('user@mail.com')
        cy.get('[data-cy=password-input]').type('123456')

        cy.get('[data-cy=submit-login]').click()



         
        
        // cy.get('[data-cy=new-project-button]')
        //     .should('exist')
        //     .click()
    
        // cy.get('[data-cy=submit-new-project]').click()

        // cy.get('[data-cy=alert]')
        // .should('exist')
        // .invoke('text')
        // .should('equal', 'The project name is required')
        
        // cy.get('[data-cy=alert]')
        // .should('have.class', 'mensaje error')
        

    })

    it('<Projects/> - Project validations', () => {
        cy.get('[data-cy=new-project-button]')
            .should('exist')
            .click()
    
        cy.get('[data-cy=submit-new-project]').click()

        
        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'The project name is required')
        
        cy.get('[data-cy=alert]')
            .should('have.class', 'mensaje error')
        
    })
    
    it('<Projects /> - Project creation', () => {
        cy.get('[data-cy=new-project-input]').type('E-commerce page')
        cy.get('[data-cy=submit-new-project]').click()
        
        
        // Select project
        cy.get('[data-cy=project-list] li:nth-child(1) button').click()
    })
    
    it('<TaskForm/> - Task validation', () => {
        cy.get('[data-cy=submit-task]').click()
        
        cy.get('[data-cy=alert]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Task name is required')
        
        cy.get('[data-cy=alert]')
        .should('have.class', 'mensaje error')
        
        cy.get('[data-cy=task-input]').type('Define colors')
        cy.get('[data-cy=submit-task]').click()
        cy.get('[data-cy=task-input]').type('Define fonts')
        cy.get('[data-cy=submit-task]').click()
        cy.get('[data-cy=task-input]').type('Define sections')
        cy.get('[data-cy=submit-task]').click()
    })
    
    it('<Task/> - Toggle Finished/Unfinished, edition & removal', () => {
        // toggle to finished
        cy.get('[data-cy=task]:nth-child(1) [data-cy=unfinished-task]').click()
        cy.get('[data-cy=task]:nth-child(1) [data-cy=finished-task]')
        .should('have.class', 'finished')
        
        // toggle to unfinished
        cy.get('[data-cy=task]:nth-child(1) [data-cy=finished-task]').click()
        cy.get('[data-cy=task]:nth-child(1) [data-cy=unfinished-task]')
        .should('have.class', 'unfinished')
        
        // edit task
        cy.get('[data-cy=task]:nth-child(1) [data-cy=edit-task-button]').click()
        
        cy.get('[data-cy=task-input]').clear().type('Edited task')
        cy.get('[data-cy=submit-task]').click()
        
        // delete task
        cy.get('[data-cy=task]:nth-child(1) [data-cy=delete-task-button]').click()
        cy.get('[data-cy=task]:nth-child(1)')
            .invoke('text')
            .should('not.equal', 'Edited task')

    })
})
