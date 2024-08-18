import Express, {Request, Response} from 'express'
import userController from '../controller/user.ontroller'
import isAuth  from '../middleware/isAuth.middleware'


const userRoute = Express.Router()
userRoute.get('/v1/users', (req: Request, res: Response) => { res.json({message: "put some credentials to login"}) })
userRoute.post('/v1/users', userController.login);
userRoute.post('/v1/users/sign', userController.create);

export default userRoute;