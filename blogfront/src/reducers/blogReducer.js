import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlog(state, action) {
            const blog = action.payload
            state.push(blog)
        },
        setBlogs(state, action) {
            return action.payload.sort((blog1, blog2) => blog2.likes - blog1.likes)
        },
        voteInternalBlog(state, action) {
            const blogToVote = action.payload
            return state
                .map((blog) => (blog.id !== blogToVote.id ? blog : blogToVote))
                .sort((blog1, blog2) => blog2.likes - blog1.likes)
        },
        deleteInternalBlog(state, action) {
            const deletedBlog = action.payload
            console.log(deletedBlog)
            return state.filter((blog) => blog.id !== deletedBlog.id)
        },
    },
})

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch(addBlog(newBlog))
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const voteBlog = (blog, user) => {
    return async (dispatch) => {
        const votedBlog = await blogService.addLike(blog)
        dispatch(voteInternalBlog({ ...votedBlog, user: user }))
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogService.deleteBlog(blog)
        dispatch(deleteInternalBlog(blog))
    }
}

export const { addBlog, setBlogs, voteInternalBlog, deleteInternalBlog } =
    blogSlice.actions
export default blogSlice.reducer
