const router = require('express').Router()
const Blog = require('.././models/blog')
const User = require('.././models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.send('db reset').status(200).end()
})

// eslint-disable-next-line no-undef
module.exports = router
