import Koa from 'koa'

import router from './routes'
import { logger, responseTime } from "./middlewares"

const PORT = 8000

const app = new Koa()

// Middlewares
app.use(logger)
app.use(responseTime)

// Router
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT)

console.log(`Service 'api' launched! 🚀`)
console.log(`Listening on port ${PORT}...`)

// Used by tests
export default app