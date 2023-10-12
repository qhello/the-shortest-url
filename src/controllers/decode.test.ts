import request from 'supertest';
import app from '../app';

describe('Decode URL endpoint', () => {

    const handler = (testShortId: string) => request(app.callback()).get(`/decode/${testShortId}`);

    it('should return the original URL for a valid shortId', async () => {
        // Using cache init value
        const testShortId = "HvFkiINuAg2u";
        const expectedUrl = "https://www.google.com";

        const response = await handler(testShortId)

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ decodedUrl: expectedUrl });
    });

    it('should return a 404 for an invalid shortId', async () => {
        const invalidShortId = "invalidShortId";

        const response = await handler(invalidShortId)

        expect(response.status).toBe(404);
    });

});
