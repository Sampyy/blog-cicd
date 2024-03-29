const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
}

// eslint-disable-next-line no-undef
module.exports = {
    usersInDb,
}
