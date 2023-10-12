import { Context } from 'koa'

import { shortIdGenerator } from '../libs/short-id-generator'
import { CACHE } from '../cache'

const SHORT_ID_LENGTH = 12

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

    // generate a new short id - or reuse past encoding
    const shortId = CACHE.get(parsedUrl, "url") ?? shortIdGenerator(SHORT_ID_LENGTH)

    // save to cache
    CACHE.set(parsedUrl, shortId)


    // return
    ctx.body = { shortUrl: shortId }
}