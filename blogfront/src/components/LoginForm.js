import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    LoginForm.propTypes = {
        username: propTypes.string.isRequired,
        password: propTypes.string.isRequired,
        setUsername: propTypes.func.isRequired,
        setPassword: propTypes.func.isRequired,
        handleLogin: propTypes.func.isRequired,
    }

    const handleLogin = async (event) => {
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
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" id="login-button">
                        login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
