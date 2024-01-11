import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Navbar from './components/Navbar'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { loginUser, clearUser, setUser } from './reducers/userReducer'
import User from './components/User'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useMatch,
} from 'react-router-dom'
import Home from './components/Home'
import { initializeComments } from './reducers/commentReducer'

const App = () => {
    const user = useSelector((state) => state.user)
    const users = useSelector((state) => state.users)
    const blogs = useSelector((state) => state.blogs)
    const comments = useSelector((state) => state.comments)
    const match = useMatch('/blogs/:id')

    const blog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null

    const blogFormRef = useRef()

    const dispatch = useDispatch()

    /*const handleLogin = async (event) => {
        event.preventDefault()
        try {
            //const user = await loginService.login({ username, password })
            //setUser(user)
            const user = await dispatch(loginUser({ username, password }))
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
            dispatch(setNotification('Logged in as ' + user.username, false))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification('Incorrect username or password', true))
        }
    }*/

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        //setUser(null)
        dispatch(clearUser())
        dispatch(setNotification('Succesfully logged out', false))
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const tokenUser = JSON.parse(loggedUserJSON)
            dispatch(setUser(tokenUser))
            //setUser(user)
            blogService.setToken(tokenUser.token)
        }
    }, [])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeComments())
    }, [dispatch])

    return (
        <div>
            <Navbar handleLogout={handleLogout} />

            <div className="container">
                <h1>Blogs</h1>

                <Notification />
                {user === null ? <LoginForm /> : null}
                <Routes>
                    <Route
                        path="/"
                        element={<Home blogFormRef={blogFormRef} />}
                    />
                    <Route
                        path="/blogs/:id"
                        element={<Blog full={true} blog={blog} />}
                    />
                    <Route path="/users/:id" element={<User users={users} />} />
                    <Route path="/users" element={<Users />} />
                    <Route
                        path="/blogs"
                        element={<Blogs blogFormRef={blogFormRef} />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
