export default {
    PORT: process.env.PORT,
    ENV: process.env.ENV as string,
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_KEY: process.env.JWT_KEY as string // from secrets object in cluster
}