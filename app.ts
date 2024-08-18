import Express, { Request, Response, NextFunction} from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import route from './route/index.route'
import JsonParse from './middleware/jsonParse.middleware'

const app = Express()
app.use(cors())
app.use(cookieparser())
app.use(Express.json())
app.use(Express.urlencoded({ extended: true}))
app.use(JsonParse)
app.use(route);
app.use((req: Request, res: Response) => {
    res.status(404).json({"Error":"page not found!"})
})


export default app
