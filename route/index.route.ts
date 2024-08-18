import Express, {Request, Response} from 'express'
import userRoute from './users.route'
import linkRoute from './link.route'

const route = Express.Router()

route.get(['/', '/v1'],(req: Request, res: Response) => {
    res.json({message: "Welcome to cut.io api 👀"})
    res.end()
})

route.use(userRoute)
route.use(linkRoute)

export default route
