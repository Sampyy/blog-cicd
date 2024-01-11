import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('Adding a blog calls createBlog with correct props', async () => {
    const createBlog = jest.fn()

    render(<BlogForm addBlog={createBlog} />)

    const author = screen.getByPlaceholderText('Author name')
    const title = screen.getByPlaceholderText('Title name')
    const url = screen.getByPlaceholderText('url for blog')

    const sendButton = screen.getByText('Add blog')
    userEvent.type(author, 'testing author')
    userEvent.type(title, 'title heree')
    userEvent.type(url, 'testing url')

    userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log('täällä + ' + JSON.stringify(createBlog.mock.calls))
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].title).toBe('title heree')
    expect(createBlog.mock.calls[0][0].url).toBe('testing url')
    expect(createBlog.mock.calls[0][0].likes).toBe(0)
})
