import app from './app'

import config from './config'

app.listen(config.APP_PORT)

console.log(`Service 'api' launched! 🚀`)
console.log(`Listening on port ${config.APP_PORT}...`)