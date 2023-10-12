// Shamelessly copied over from https://github.com/ai/nanoid/blob/main/nanoid.js
export const shortIdGenerator = (length: number = 12): string => {
    const randomValues = crypto.getRandomValues(new Uint8Array(length));
    return randomValues.reduce((acc: string, value: number) => {
        value &= 63;
        if (value < 36) {
            return acc + value.toString(36);
        } else if (value < 62) {
            return acc + (value - 26).toString(36).toUpperCase();
        } else if (value === 62) {
            return acc + "-";
        } else {
            return acc + "_";
        }
    }, "");
};