import config from "./config";

class Cache {
    private shortIdToUrl: { [shortId: string]: string };
    private urlToShortId: { [url: string]: string };

    constructor() {
        this.shortIdToUrl = {
            [config.TEST_SHORT_ID]: config.TEST_URL  // Initial value for onboarding
        };
        this.urlToShortId = {
            [config.TEST_URL]: config.TEST_SHORT_ID  // Initial value for onboarding
        };
    }

    public set(url: string, shortId: string): void {
        this.shortIdToUrl[shortId] = url;
        this.urlToShortId[url] = shortId;
    }

    public get(key: string, type: "url" | "shortId"): string | undefined {
        switch (type) {
            case "url":
                return this.urlToShortId[key];
            case "shortId":
                return this.shortIdToUrl[key];
            default:
                throw new Error(`key type not found: ${type}`);
        }
    }
}

export const CACHE = new Cache();
