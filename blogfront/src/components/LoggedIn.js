import { useSelector } from 'react-redux'

const LoggedIn = ({ handleLogout }) => {
    const user = useSelector((state) => state.user)
    return (
        <div className="inline">
            <p className="inline">{user.name} logged in </p>
            <button onClick={() => handleLogout()} className="btn btn-primary">
                Log out{' '}
            </button>
        </div>
    )
}

export default LoggedIn
