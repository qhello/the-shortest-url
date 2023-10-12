import { Context } from 'koa'

import { CACHE } from '../cache'

export default async (ctx: Context): Promise<void> => {
    const { shortId } = ctx.params

    // fetch decoded url from cache
    const decodedUrl = CACHE[shortId]

    if (!decodedUrl) {
        ctx.status = 404
        return
    }

    // return
    ctx.body = { decodedUrl }
}