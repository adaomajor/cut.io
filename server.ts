import http from 'http'
import mongoose from 'mongoose'
import app from './app'
import dotenv from 'dotenv'

dotenv.config();

const port: string | 80 = process.env.PORT || 80
const mongo_url : string | undefined = process.env.MONGO_URL

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`[+] Server is running on http://localhost:${port}`)
})

mongoose.Promise = Promise

mongoose.connect('mongodb://localhost:27017/cutio')
    .then(() => console.log("mongoDB is Ok"))
    .catch(() => {
        console.log("[x] Couldn't connect to MongoDB server")
	    console.log("[x] Stopping HTTPServer...") 
	    process.exit(1)
    })





