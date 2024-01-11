import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoggedIn from './LoggedIn'

const Navbar = ({ handleLogout }) => {
    const padding = {
        padding: 5,
    }

    const inline = {
        display: 'inline',
    }

    const user = useSelector((state) => state.user)

    return (
        <div className="navBar">
            <Link style={padding} to="/">
                home
            </Link>
            <Link style={padding} to="/users">
                users
            </Link>
            <Link style={padding} to="/blogs">
                blogs
            </Link>

            {!user ? null : (
                <LoggedIn style={inline} handleLogout={handleLogout} />
            )}
        </div>
    )
}

export default Navbar
