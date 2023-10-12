import { Context } from 'koa'

import { shortIdGenerator } from '../libs/short-id-generator'
import { CACHE } from '../cache'

import config from '../config'

export default async (ctx: Context): Promise<void> => {
    const { url } = ctx.request.body

    // Verify input
    if (!URL.canParse(url)) {
        ctx.status = 400
        return
    }

    // generate a new short id - or reuse past encoding
    const shortId = CACHE.get(url, "url") ?? shortIdGenerator(config.SHORT_ID_LENGTH)

    // save to cache
    CACHE.set(url, shortId)

    const shortUrl = new URL(shortId, config.APP_BASE_URL)

    // return
    ctx.body = { shortUrl }
}