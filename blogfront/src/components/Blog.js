import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/commentReducer'
import { Link } from 'react-router-dom'
import commentService from '../services/comments'

const Blog = ({ blog, full }) => {
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const comments = useSelector((state) => state.comments)

    const showPartial = {
        display: visible ? 'none' : '',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }
    const showFull = {
        display: visible ? '' : 'none',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const handleVoteBlog = async () => {
        event.preventDefault()
        try {
            await dispatch(voteBlog(blog, blog.user))
            dispatch(
                setNotification('Voted ' + blog.title + ' by ' + blog.author)
            )
        } catch (exception) {
            dispatch(
                setNotification('Like couldn`t be added: ' + exception, true)
            )
        }
    }

    const handleDeleteBlog = async () => {
        event.preventDefault()
        try {
            if (window.confirm('Do you really want to delete the blog?')) {
                await dispatch(deleteBlog(blog))
                dispatch(
                    setNotification(
                        'Blog ' +
                            blog.title +
                            ' by ' +
                            blog.author +
                            ' has been deleted'
                    )
                )
            }
        } catch (exception) {
            dispatch(
                setNotification('blog couldn`t be deleted: ' + exception, true)
            )
        }
    }
    const createAComment = async (event) => {
        event.preventDefault()
        console.log(blog)
        try {
            await dispatch(createComment(blog, event.target.comment.value))
            dispatch(
                setNotification(
                    'Added a new comment: ' + event.target.comment.value,
                    false
                )
            )
        } catch (exception) {
            console.log(exception)
            dispatch(
                setNotification('Comment couldn´t be added: ' + exception, true)
            )
        }
    }
    if (!blog) {
        return null
    }

    if (full) {
        console.log(blog)
        return (
            <div className="blog">
                <div className="fullContent">
                    <h2>{blog.title} </h2>
                    <a href={blog.url} target={'_blank'} rel="noreferrer">
                        {blog.url}{' '}
                    </a>
                    <div>
                        <p>likes {blog.likes}</p>
                        <button onClick={() => dispatch(handleVoteBlog)} className="btn btn-success">
                            Like
                        </button>
                    </div>
                    <div>{blog.user.name}</div>
                    {user.username === blog.user.username && (
                        <div>
                            <button
                                onClick={() => handleDeleteBlog()}
                                className="btn btn-danger"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                    <h3>comments</h3>
                    <form onSubmit={createAComment}>
                        <div>
                            <input
                                name={'comment'}
                                id={'commentField'}
                                placeholder={'Comment'}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                id="addCommentButton"
                                className="btn btn-primary"
                            >
                                Add comment
                            </button>
                        </div>
                    </form>
                    <ul>
                        {comments.map((comment) =>
                            comment.blog === blog.id ? (
                                <li key={comment.id}>{comment.content}</li>
                            ) : null
                        )}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <tr>
            <div className="blog">
                <div style={showPartial} className="partialContent">
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                </div>
            </div>
        </tr>
    )

    /*return (
        <div className="blog">
            <div style={showPartial} className="partialContent">
                {blog.title} {blog.author}
                <button onClick={() => setVisible(!visible)}>show</button>
            </div>
            <div style={showFull} className="fullContent">
                <div>
                    {blog.title}{' '}
                    <button onClick={() => setVisible(!visible)}>Hide</button>
                </div>
                <div>{blog.author} </div>
                <div>{blog.url} </div>
                <div>
                    likes {blog.likes}
                    <button onClick={() => dispatch(handleVoteBlog)}>
                        Like
                    </button>
                </div>
                <div>{blog.user.name}</div>
                {user.user.username === blog.user.username && (
                    <div>
                        <button onClick={() => handleDeleteBlog()}>Remove</button>
                    </div>
                )}
            </div>
        </div>
    )*/
}
export default Blog
