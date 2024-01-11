describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', {
            username: 'testingUser',
            name: 'testingName',
            password: 'secretpw',
        })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Login')
        cy.get('#username')
        cy.get('#password')
    })

    describe('Login', function () {
        beforeEach(function () {
            cy.visit('http://localhost:3000')
        })

        it('succeeds with correct credentials', function () {
            cy.get('#username').type('testingUser')
            cy.get('#password').type('secretpw')
            cy.get('#login-button').click()
            cy.contains('Logged in as testingUser')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('testingUser')
            cy.get('#password').type('somethingwrong')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'Incorrect username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'Logged in as testingUser')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'testingUser', password: 'secretpw' })
        })

        it('A blog can be created', function () {
            cy.contains('Add a new blog').click()
            cy.get('#authorField').type('testingAuthor')
            cy.get('#titleField').type('testingTitle')
            cy.get('#urlField').type('testingUrl')
            cy.get('#addBlogButton').click()

            cy.get('.success')
                .should(
                    'contain',
                    'Added a new blog: testingTitle by testingAuthor'
                )
                .and('have.css', 'color', 'rgb(0, 128, 0)')

            cy.contains('testingTitle testingAuthor')
        })
        describe('and it exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    author: 'testingAuthor',
                    title: 'testingTitle',
                    url: 'testingUrl',
                })
            })
            it('it can be liked', function () {
                cy.contains('testingTitle testingAuthor')
                    //.contains('testingTitle')
                    .click()
                cy.get('html').should('not.contain', 'likes 1')
                cy.contains('testingTitle')
                    .parent()
                    .contains('like')
                    .find('button')
                    .click()

                cy.get('html').should('contain', 'likes 1')
            })
            it('it can be deleted by the correct user', function () {
                cy.contains('testingTitle testingAuthor')
                    //.contains('show')
                    .click()
                cy.contains('testingTitle').parent().contains('Remove').click()
                cy.get('html').should(
                    'not.contain',
                    'testingTitle testingAuthor'
                )
            })
            it('and it cannot be deleted by a different user', function () {
                cy.contains('Log out').click()
                cy.request('POST', 'http://localhost:3003/api/users', {
                    username: 'userNotGood',
                    name: 'badUser',
                    password: 'secretpw',
                })
                cy.login({ username: 'userNotGood', password: 'secretpw' })
                cy.contains('testingTitle testingAuthor')
                    //.contains('show')
                    .click()
                cy.contains('testingTitle')
                    .parent()
                    .should('not.contain', 'Remove')
            })
        })
        describe('multiple blogs are in correct order', function () {
            beforeEach(function () {
                cy.createBlog({
                    author: 'author1',
                    title: 'title1',
                    url: 'url1',
                })
                cy.createBlog({
                    author: 'author2',
                    title: 'title2',
                    url: 'url2',
                })
                cy.createBlog({
                    author: 'author3',
                    title: 'title3',
                    url: 'url3',
                })
                cy.createBlog({
                    author: 'author4',
                    title: 'title4',
                    url: 'url4',
                })
            })
            it('and when liking one, it will be first', function () {
                cy.get('.blog').eq(0).should('not.contain', 'title4')
                cy.contains('title4 author4')
                    //.parent()
                    //.contains('show')
                    .click()
                //cy.contains('title4')
                //.parent()
                cy.contains('Like').click()
                cy.visit('http://localhost:3000')
                cy.wait(500)
                cy.get('.blog').eq(0).should('contain', 'title4')
            })
            it('and when liking multiple, they will be in correct order', function () {
                cy.get('.blog').eq(0).should('not.contain', 'title4')
                cy.contains('title1')
                    //.parent() //.contains('show')
                    .click()
                cy.visit('http://localhost:3000')
                cy.contains('title2')
                    //.parent() //.contains('show')
                    .click()
                cy.contains('Like').click()
                cy.visit('http://localhost:3000')
                cy.contains('title3')
                    //.parent() //.contains('show')
                    .click()
                cy.contains('Like').click()
                cy.wait(200)
                cy.contains('Like').click()
                cy.wait(200)
                cy.contains('Like').click()
                cy.visit('http://localhost:3000')
                cy.contains('title4')
                    //.parent() //.contains('show')
                    .click()
                cy.contains('Like').click()
                cy.wait(100)
                cy.contains('Like').click()

                /*cy.wait(100)
                cy.contains('title4').parent().contains('Like').click()
                cy.wait(100)
                cy.contains('title3').parent().contains('Like').click()
                cy.wait(100)
                cy.contains('title2').parent().contains('Like').click()
                cy.wait(500)
                cy.contains('title3').parent().contains('Like').click()
                cy.wait(100)
                cy.contains('title4').parent().contains('Like').click()
                cy.wait(500)
                cy.contains('title3').parent().contains('Like').click()*/
                cy.visit('http://localhost:3000')
                cy.wait(505)
                cy.get('.blog').eq(0).should('contain', 'title3')
                cy.get('.blog').eq(1).should('contain', 'title4')
                cy.get('.blog').eq(2).should('contain', 'title2')
                cy.get('.blog').eq(3).should('contain', 'title1')
            })
        })
    })
})
