import Express, {Request, Response, NextFunction} from 'express'
import linkModel from '../model/link.model'

const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user
    const id = req.params.id

    if(await linkModel.findOne({ id })){
        const link = await linkModel.findOne({id, user})
        if(link){
            return next()  
        }else{
            res.status(403).json({'error':"you're not the owner of the link!"}).end()
        }
    }else{
        res.status(404).json({'error':'no link found!'}).end()
    }
}

export default isOwner