import Express, {Request, Response} from 'express'
import linkController from '../controller/link.ontroller'
import isAuth  from '../middleware/isAuth.middleware'
import isOwner from '../middleware/isOwner.middleware'


const linkRoute = Express.Router()
linkRoute.get('/v1/link', isAuth, linkController.get)
linkRoute.put('/v1/link/add', isAuth, linkController.add);
linkRoute.delete('/v1/link/delete/:id', isAuth, isOwner, linkController.delete);

export default linkRoute;