// eslint-disable-next-line no-unused-vars
const blog = require('../models/blog')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (likes, blog) => {
        return likes + blog.likes
    }
    // eslint-disable-next-line no-unused-vars
    const save = 'awgr'
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    var currentFavorite = blogs[0]
    blogs.map((blog) => {
        if (blog.likes > currentFavorite.likes) {
            currentFavorite = blog
        }
    })

    return currentFavorite || 'No blogs'
}

const mostBlogs = (blogs) => {
    var currentTopAuthor = ''
    var currentTopBlogs = 0
    var blogsAmounts = {}

    blogs.map((blog) => {
        blogsAmounts[blog.author] = blogsAmounts[blog.author] + 1 || 1
        if (blogsAmounts[blog.author] > currentTopBlogs) {
            currentTopAuthor = blog.author
            currentTopBlogs = blogsAmounts[blog.author]
        }
    })

    return { author: currentTopAuthor, blogs: Number(currentTopBlogs) }
}

const mostLikes = (blogs) => {
    var likesAmounts = {}
    var currentTopAuthor = ''
    var currentTopLikes = 0

    blogs.map((blog) => {
        likesAmounts[blog.author] =
            likesAmounts[blog.author] + blog.likes || blog.likes
        if (likesAmounts[blog.author] > currentTopLikes) {
            currentTopAuthor = blog.author
            currentTopLikes = likesAmounts[blog.author]
        }
    })

    return { author: currentTopAuthor, likes: currentTopLikes }
}

// eslint-disable-next-line no-undef
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
