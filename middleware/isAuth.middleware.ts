import Express, {Request, Response, NextFunction} from 'express'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import userModel from '../model/user.model'

const secret_key: string = process.env.SECRET_KEY || "adammajorcutio_secret_key"

const delete_cookie = (res: Response) => {
    res.clearCookie('user_id')
    res.clearCookie('AUTH-TOKEN')
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const userToken = req.cookies['AUTH-TOKEN']
    if(userToken){
        const user = jwt.verify(userToken, secret_key) as JwtPayload
        if(!user){ 
            delete_cookie(res)
            res.status(401).json({"Error":"Sign in on the app!"}).end() 
        }else{
            const userExits = await userModel.findById(user._id)
            if(!userExits){
                delete_cookie(res)
            }else{
                req.body.user = userExits
                return next()
            }
        }
        res.end()
    }else{
        //delete_cookie(res)
        res.status(401).json({"Error":"Sign in on the app!"}).end()
    }
}

export default isAuth