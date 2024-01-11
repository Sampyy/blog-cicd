const app = require('./blogbackend/app')
const http = require('http')
const config = require('./blogbackend/utils/config')
const logger = require('./blogbackend/utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
