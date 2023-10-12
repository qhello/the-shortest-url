import { Context } from 'koa'

import { shortIdGenerator } from '../libs/short-id-generator'
import { CACHE } from '../cache'

export default async (ctx: Context): Promise<void> => {
    const { url } = ctx.request.body

    let parsedUrl: string

    // Verify input
    try {
        parsedUrl = new URL(url).toString()
    } catch (error) {
        ctx.status = 400
        return
    }

    // generate a new short id
    const shortId = shortIdGenerator(12)

    // save to cache
    CACHE[shortId] = parsedUrl

    // return
    ctx.body = { shortUrl: shortId }
}