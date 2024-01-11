const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment.find({})
    response.json(comments.map((comment) => comment.toJSON()))
})

module.exports = commentsRouter