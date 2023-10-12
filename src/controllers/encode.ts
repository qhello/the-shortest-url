import { Context } from 'koa'

import { shortIdGenerator } from '../libs/short-id-generator'
import { CACHE } from '../cache'

export default async (ctx: Context): Promise<void> => {
    const { url } = ctx.request.body

    // generate a new short id
    const shortId = shortIdGenerator()

    // save to cache
    CACHE[shortId] = url

    // return
    ctx.body = { shortUrl: shortId }
}