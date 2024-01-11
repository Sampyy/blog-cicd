import { useSelector } from 'react-redux'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Blogs = ({ blogFormRef }) => {
    const user = useSelector((state) => state.user)

    if (user !== null) {
        return (
            <div>
                <Toggleable buttonLabel={'Add a new blog'} ref={blogFormRef}>
                    <BlogForm user={user} blogFormRef={blogFormRef} />
                </Toggleable>
                <h2>blogs</h2>
                <BlogList user={user} />
            </div>
        )
    }

    return null
}

export default Blogs
