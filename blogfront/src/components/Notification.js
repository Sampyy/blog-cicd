import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification[0] !== '' && notification[1] === false) {
        return <div className="success">{notification}</div>
    }
    if ( notification[0] !== '' && notification[1] === true) {
        return <div className="error">{notification}</div>
    }
    return null
}

export default Notification
