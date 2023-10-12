import request from 'supertest';
import app from '../app';  // Adjust the path to your actual Koa app file
import config from '../config';

const handler = () => request(app.callback()).post('/encode');

describe('Shorten URL endpoint', () => {
    it('should shorten the URL and return a correct URL', async () => {
        const testUrl = "http://example.com";

        const response = await handler().send({ url: testUrl });

        expect(response.status).toBe(200);

        const shortUrl = response.body.shortUrl;

        // Make sure output is a valid URL
        expect(shortUrl).toBeDefined();
        expect(URL.canParse(shortUrl)).toBeTruthy();

        // Make sure output is using appropriate base domain
        const shortUrlHost = new URL(shortUrl).host;
        expect(shortUrlHost).toEqual(config.APP_HOST);

        // Make sure shortened URL is using the correct shortId format
        const shortId = new URL(shortUrl).pathname.replace("/", "");
        expect(shortId.length).toBe(config.SHORT_ID_LENGTH);
    });

    it('should return a 400 status for invalid URL input', async () => {
        const invalidUrl = "not-a-valid-url";

        const response = await handler().send({ url: invalidUrl });

        expect(response.status).toBe(400);
    });

    it('should return the same shortId for a previously shortened URL', async () => {
        const testUrl = "http://example.com";

        // First request to get the shortId
        const firstResponse = await handler().send({ url: testUrl });
        const firstShortUrl = firstResponse.body.shortUrl;

        // Second request with the same URL
        const secondResponse = await handler().send({ url: testUrl });
        const secondShortUrl = secondResponse.body.shortUrl;

        expect(firstShortUrl).toBe(secondShortUrl);
    });
});
