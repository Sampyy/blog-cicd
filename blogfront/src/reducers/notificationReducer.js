import { createSlice } from '@reduxjs/toolkit'

let lastTimeout = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setSuccessNotification(state, action) {
            clearTimeout(lastTimeout)
            return [action.payload, false]
        },
        setErrorNotification(state, action) {
            clearTimeout(lastTimeout)
            return [action.payload, true]
        },
        removeNotification(state, action) {
            return ['', false]
        },
    },
})

export const setNotification = (notification, type) => {
    switch (type) {
    case true:
        return (dispatch) => {
            dispatch(setErrorNotification(notification))
            lastTimeout = setTimeout(
                () => dispatch(removeNotification('')),
                5000
            )
        }
    default:
        return (dispatch) => {
            dispatch(setSuccessNotification(notification))
            lastTimeout = setTimeout(() => dispatch(removeNotification('')), 5000)
        }
    }
}

export const {
    setInternalNotification,
    removeNotification,
    setSuccessNotification,
    setErrorNotification,
} = notificationSlice.actions
export default notificationSlice.reducer
