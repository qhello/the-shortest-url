import Router from '@koa/router'

import encode from './controllers/encode'

const router = new Router()

router.post('/encode', encode)
router.get('/decode', () => console.log('hello world!'))

export default router