import Router from '@koa/router'

const router = new Router()

router.get('/encode', () => console.log('hello world!'))
router.get('/decode', () => console.log('hello world!'))

export default router