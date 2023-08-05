describe('Issue create', () => {
  beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
          //System will already open issue creating modal in beforeEach block  
          cy.visit(url + '/board?modal-issue-create=true');
      });
    });
    it('Should create a new issue and validate it successfully', () => {
      //issue is created  by filling mandatory field
      cy.get('[data-testid="modal:issue-create"]').within(() => {
          cy.get('.ql-editor').type('My bug description');
          cy.get('input[name="title"]').type('Bug');
          cy.get('button[type="submit"]').click();
      });
      cy.get('[data-testid="modal:issue-create"]').should('not.exist');
      cy.contains('Issue has been successfully created.').should('be.visible');
      cy.reload();
      cy.contains('Issue has been successfully created.').should('not.exist');
      cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
          cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').contains('Bug');
        });
     
      
           
        
       
      
       //Open created issue's detail view and check if no time is logged
      cy.contains('Bug').click();
      cy.contains('No time logged').should('exist');

      // Add value 10 to “Original estimate (hours)” field
      cy.get('input[placeholder="Number"]').click().type("value=10");
      cy.contains('Original Estimate (hours)').click();
      cy.get('[placeholder="Number"]').should("have.value", "10");

      // Close detail view and open the issue again to check that original estimation is saved
      cy.get('button i[data-testid="icon:close"]').click();
      cy.contains('Bug').click();
      cy.contains('10h estimated').should('exist');
        
        
      
      //remove value 10 to “Original estimate (hours)” field and add new value 20  
      cy.get('input[placeholder="Number"]').click().clear("value=10").type("value=20");
      cy.contains('Original Estimate (hours)').click();
      cy.get('[placeholder="Number"]').should("have.value", "20");
      // Close detail view and open the issue again to check that updated estimation is saved
      cy.get('button i[data-testid="icon:close"]').click();
      cy.contains('Bug').click();
      cy.contains('20h estimated').should('exist');

      //  Remove value 20 to “Original estimate (hours)” field
      cy.get('input[placeholder="Number"]').click().clear("value=20");
      cy.contains('Original Estimate (hours)').click();
      cy.get('button i[data-testid="icon:close"]').click();
      cy.contains('Bug').click();
      cy.contains('No time logged').should('exist');

      //Time Log
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('input[placeholder="Number"]').eq(1).clear().type('2{enter}');
        cy.get('input[placeholder="Number"]').eq(2).clear().type('5{enter}');
        cy.get('[data-testid="modal:tracking"]').contains('Done').click();
        cy.get('[data-testid="icon:stopwatch"]').next().should('contain', '2h logged')
        .should('not.contain', 'No time logged').and('contain', '5h remaining');

      //Remove Logged Time
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('input[placeholder="Number"]').eq(1).clear();
        cy.get('input[placeholder="Number"]').eq(2).clear();
        cy.get('[data-testid="modal:tracking"]').contains('Done').click();
        cy.get('[data-testid="icon:stopwatch"]').next().should('contain', 'No time logged')
        .should('not.contain', '2h logged').and('not.contain', '5h remaining');
});

});





