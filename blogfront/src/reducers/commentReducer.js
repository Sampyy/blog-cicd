import { createSlice } from '@reduxjs/toolkit'
import comments from '../services/comments'
import commentService from '../services/comments'
import blogService from '../services/blogs'

const commentSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload
        },
        addComment(state, action) {
            const comment = {
                blog: action.payload.blog.id,
                content: action.payload.content,
            }
            state.push(comment)
        },
    },
})

export const initializeComments = () => {
    return async (dispatch) => {
        const comments = await commentService.getAll()
        dispatch(setComments(comments))
    }
}

export const createComment = (blog, newComment) => {
    return async (dispatch) => {
        //console.log(blog + '  ' + newComment)
        const comment = await blogService.addComment(blog, {
            content: newComment,
        })
        dispatch(addComment(comment))
    }
}

export const { setComments, addComment } = commentSlice.actions
export default commentSlice.reducer
