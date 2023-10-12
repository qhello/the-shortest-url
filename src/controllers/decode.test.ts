import request from 'supertest';
import app from '../app';
import config from '../config';

describe('Decode URL endpoint', () => {

    const handler = () => request(app.callback()).post(`/decode`);

    it('should return the original URL for a valid short URL', async () => {
        // Using cache init value
        const testShortId = config.TEST_SHORT_ID;
        const expectedUrl = config.TEST_URL;
        const shortUrl = new URL(testShortId, config.APP_BASE_URL);

        const response = await handler().send({ shortUrl });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ decodedUrl: expectedUrl });
    });

    it('should return a 404 for an invalid shortId', async () => {
        const invalidShortId = "invalidShortId";
        const shortUrl = new URL(invalidShortId, config.APP_BASE_URL);

        const response = await handler().send({ shortUrl });

        expect(response.status).toBe(404);
    });

    it('should return a 400 for a malformed URL', async () => {
        const malformedUrl = "not-a-valid-url";

        const response = await handler().send({ shortUrl: malformedUrl });

        expect(response.status).toBe(400);
    });

    it('should return a 400 for an incorrect host', async () => {
        const incorrectHostShortUrl = new URL(config.TEST_SHORT_ID, "https://wrong-host.com/");

        const response = await handler().send({ shortUrl: incorrectHostShortUrl });

        expect(response.status).toBe(400);
    });
});
