import 'dotenv/config'

export default {
    APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    APP_BASE_URL: process.env.APP_BASE_URL ?? "http://localhost:3000/",
    SHORT_ID_LENGTH: process.env.SHORT_ID_LENGTH ? parseInt(process.env.SHORT_ID_LENGTH) : 12
}