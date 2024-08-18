import Express, {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/user.model'

const options = {
    maxAge: 1000 * 60 * 60, 
    httpOnly: true,          
    secure: true,                    
}

class userController{
    async login(req: Request, res: Response){
        const { email, password } = req.body
        try{
            const userExists = await User.findOne({ email }).select('+password')
            if(userExists){
                const isMatch =  userExists.compare(password)
                if(!isMatch){ res.status(401).json({Error:"incorrect password!"}) }
                else{
                    const secret_key: string = process.env.SECRET_KEY || "adammajorcutio_secret_key"
                    const authToken: string =  await jwt.sign({
                         _id: userExists.id,
                        username: userExists.username, 
                        email: userExists.email, join_date: userExists.created
                    }, secret_key ,{ expiresIn: '1h'})

                    const user = { _id: userExists.id, username: userExists.username, email: userExists.email, join_date: userExists.created, token: authToken}
                    res.cookie('user_id', userExists.id, options)
                    res.cookie('AUTH-TOKEN', authToken, options)
                    res.json(user)
                }
            }else{ res.json({Error:"user not found with this email!"}).status(404)}
        }catch{
            res.status(500)
        }finally{
            res.end()
        }
    }

    async create(req: Request, res: Response){
        const { username, email , password } = req.body
        try{
            if(!username || !email || !password){
                res.status(400).json({"error":"empty fields"})
            }else{
                const user = await User.findOne({ email })
                if(user){
                    res.json({Errosr:"Another user is already using this email"}).end()
                }else{
                    const newUser = await User.create({ username, email, password })
                    newUser.save()
                    const secret_key: string = process.env.SECRET_KEY || "adammajorcutio_secret_key"
                    const authToken =  await jwt.sign({
                         _id: newUser.id,
                        username: newUser.username, 
                        email: newUser.email, join_date: newUser.created
                    }, secret_key ,{ expiresIn: '1h'})

                    const user = { _id: newUser.id, 
                        username: newUser.username, 
                        email: newUser.email, 
                        join_date: newUser.created,
                        token: authToken
                    }
                    res.cookie('user_id', newUser.id, options)
                    res.cookie('AUTH-TOKEN', authToken, options)
                    res.status(201).json(user)
                }

            }
        }catch{
             res.json({Error:"internal server error"}).status(500)
        }finally{ res.end() }
    }
    //delete
}

export default new userController()