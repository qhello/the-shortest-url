import Koa from 'koa'
import koaBody from 'koa-body'

import router from './routes'
import { logger, responseTime } from "./middlewares"

const app = new Koa()

// Koa body
app.use(koaBody());

// Middlewares
app.use(logger)
app.use(responseTime)

// Router
app.use(router.routes())
app.use(router.allowedMethods())

export default app