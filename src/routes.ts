import Router from '@koa/router'

import encode from './controllers/encode'
import decode from './controllers/decode'

const router = new Router()

router.post('/encode', encode)

router.get('/decode/:shortId', decode)

export default router