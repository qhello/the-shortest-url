import { shortIdGenerator } from './short-id-generator';

describe('shortIdGenerator', () => {

    it('should generate a string with the default length of 12', () => {
        const id = shortIdGenerator();
        expect(typeof id).toBe('string');
        expect(id.length).toBe(12);
    });

    it('should generate a string with the specified length', () => {
        const length = 16;
        const id = shortIdGenerator(length);
        expect(id.length).toBe(length);
    });

    it('should produce different values on subsequent calls', () => {
        const id1 = shortIdGenerator();
        const id2 = shortIdGenerator();
        expect(id1).not.toBe(id2);
    });
});
