describe('Issue delete ', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });



it('Should delete issue', () => {
//Assert that issue detail view modal is visible
cy.get('[data-testid="modal:issue-details"]').should('be.visible');
// click on delete button and confirm deletion
cy.get('[data-testid="icon:trash"]').click();
cy.contains('Delete issue').click();
//Assert that deletion confirmation dialogue is not visible
cy.get('[data-testid="modal:confirm"]').should('not.exist');
//Assert that issue is deleted and not displayed on the Jira board
cy.get('[data-testid="board-list:backlog"]').contains('This is an issue of type: Task.').should('not.exist');

});


it('Start delete issue and then cancel the process', () => {
//Assert that issue detail view modal is visible
cy.get('[data-testid="modal:issue-details"]').should('be.visible');
//Click on delete button and then cancel button
cy.get('[data-testid="icon:trash"]').click();
cy.contains('Cancel').click();
//Assert that deletion confirmation dialogue is not visible
cy.get('[data-testid="modal:confirm"]').should('not.exist');
 //Assert that Issue details view is closed
 cy.get('[data-testid="icon:close"]').first().click();
   //Assert that issue is displayed on Jira board
   cy.get('[data-testid="board-list:backlog"]').contains('This is an issue of type: Task.').should('exist');

});
});


