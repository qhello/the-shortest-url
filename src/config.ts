import 'dotenv/config'

const APP_BASE_URL = process.env.APP_BASE_URL ?? "http://localhost:3000/"

export default {
    APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    APP_BASE_URL: APP_BASE_URL,
    APP_HOST: new URL(APP_BASE_URL).host,
    SHORT_ID_LENGTH: process.env.SHORT_ID_LENGTH ? parseInt(process.env.SHORT_ID_LENGTH) : 12,
    TEST_SHORT_ID: process.env.TEST_SHORT_ID ?? "HvFkiINuAg2u",
    TEST_URL: process.env.TEST_URL ?? "https://www.google.com"
}