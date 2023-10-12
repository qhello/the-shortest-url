import request from 'supertest';
import app from '../app';  // Adjust the path to your actual Koa app file

const handler = request(app.callback()).post('/encode')

describe('Shorten URL endpoint', () => {
    it('should shorten the URL and return a short URL ID', async () => {
        const testUrl = "http://example.com";

        const response = await handler.send({ url: testUrl });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('shortUrl');
        expect(typeof response.body.shortUrl).toBe('string');
    });

    it('should return a 400 status for invalid URL input', async () => {
        const invalidUrl = "not-a-valid-url";

        const response = await handler.send({ url: invalidUrl });

        expect(response.status).toBe(400);
    });

    it('should return the same shortId for a previously shortened URL', async () => {
        const testUrl = "http://example.com";

        // First request to get the shortId
        const firstResponse = await handler.send({ url: testUrl });
        const firstShortId = firstResponse.body.shortUrl;

        // Second request with the same URL
        const secondResponse = await handler.send({ url: testUrl });
        const secondShortId = secondResponse.body.shortUrl;

        expect(firstShortId).toBe(secondShortId);
    });
});
