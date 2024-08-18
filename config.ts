import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mong_url: process.env.MONGO_URL,
    secret_key: process.env.SECRET_KEY,
}

