import { Context } from 'koa'

import { CACHE } from '../cache'
import config from '../config'

export default async (ctx: Context): Promise<void> => {
    const { shortUrl } = ctx.request.body

    // Verify shortUrl is of valid format
    if (!URL.canParse(shortUrl)) {
        ctx.status = 400
        return
    }

    const parsedShortUrl = new URL(shortUrl)

    // Verify shortUrl has valid host
    if (parsedShortUrl.host !== config.APP_HOST) {
        ctx.status = 400
        return
    }

    const shortId = parsedShortUrl.pathname.replace("/", "")

    // fetch decoded url from cache
    const decodedUrl = CACHE.get(shortId, 'shortId')

    if (!decodedUrl) {
        ctx.status = 404
        return
    }

    // return
    ctx.body = { decodedUrl }
}