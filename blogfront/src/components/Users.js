import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector((state) => state.users)
    return (
        <div>
            <tbody>
                <h2>Users</h2>
                <tr>
                    <td>name</td>
                    <td>blogs created</td>
                </tr>
                {users.map((user) => (
                    <tr key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
            </tbody>
        </div>
    )
}

export default Users
