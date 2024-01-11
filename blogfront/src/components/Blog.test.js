import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog/> display', () => {
    let container

    beforeEach(() => {
        const blog = {
            title: 'titleFound',
            author: 'authorThere',
            url: 'noUrl',
            likes: 5,
            user: {
                name: 'User',
            },
        }
        const user = {
            name: 'User',
            username: 'User',
        }
        container = render(<Blog blog={blog} user={user} />).container
    })

    test('renders blog title', () => {
        const element = screen.getByText('titleFound')
        expect(element).toBeDefined
    })

    test('renders blog author', () => {
        const element = screen.getByText('authorThere')
        expect(element).toBeDefined
    })

    test('renders blog url', () => {
        const element = screen.getByText('noUrl')
        expect(element).toBeDefined
    })

    test('renders blog likes', () => {
        const element = screen.getByText('likes 5')
        expect(element).toBeDefined
    })

    test('at start url and lieks are not visible', () => {
        const div = container.querySelector('.fullContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking, url and likes are visible', async () => {
        const button = screen.getByText('show')
        await userEvent.click(button)

        const div = container.querySelector('.fullContent')
        expect(div).not.toHaveStyle('display: none')
    })
})

test('clicking like twice calls eventhandler twice', async () => {
    const mockHandler = jest.fn()

    const blog = {
        title: 'titleFound',
        author: 'authorThere',
        url: 'noUrl',
        likes: 5,
        user: {
            name: 'User',
        },
    }
    const user = {
        name: 'User',
        username: 'User',
    }

    render(<Blog blog={blog} user={user} handleAddLike={mockHandler} />)
    const button = screen.getByText('Like')
    await userEvent.click(button)
    await userEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
