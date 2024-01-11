import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ blogFormRef }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const createABlog = async (event) => {
        event.preventDefault()
        try {
            await dispatch(
                createBlog({
                    author: event.target.author.value,
                    title: event.target.title.value,
                    url: event.target.url.value,
                    likes: 0,
                    user: user,
                })
            )
            dispatch(
                setNotification(
                    'Added a new blog: ' +
                        event.target.title.value +
                        ' by ' +
                        event.target.author.value,
                    false
                )
            )
            blogFormRef.current.toggleVisibility()
            event.target.author.value = ''
            event.target.title.value = ''
            event.target.url.value = ''
        } catch (exception) {
            console.log(exception)
            dispatch(
                setNotification('Blog couldn´t be added: ' + exception, true)
            )
        }
    }

    return (
        <div>
            <h2>add new blog</h2>
            <form onSubmit={createABlog}>
                <div>
                    author:{' '}
                    <input
                        name="author"
                        id="authorField"
                        placeholder="Author name"
                    />
                </div>
                <div>
                    title:{' '}
                    <input
                        name="title"
                        id="titleField"
                        placeholder="Title name"
                    />
                </div>
                <div>
                    url:{' '}
                    <input
                        name="url"
                        id="urlField"
                        placeholder="url for blog"
                    />
                </div>
                <div>
                    <button type="submit" id="addBlogButton" className="btn btn-primary">
                        Add blog
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm
