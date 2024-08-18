import Express, {Request, Response} from 'express'
import linkModel from '../model/link.model'
import { create } from 'domain'

class linkController{
    async get(req: Request, res: Response){
        try{
            const user = req.body.user
            const links = await linkModel.find({ user }).sort({created: -1}).limit(5)
            res.status(200).json(links)
        }catch{
             res.status(500).json({Error:"something was wrong!"})
        }
    }
    async add(req: Request, res: Response){
        const { title, url } = req.body
        const user = req.body.user
        if(!title || !url){ 
            res.status(400).json({Error:"empty fields!"}).end()
        }else{
            const last_link = await linkModel.find().sort({created: -1}).limit(1)
            const id = last_link[0].id + 1
            const newLink = await linkModel.create({ id, title, url, user})
            newLink.save()
            res.status(201).json(newLink).end()
        }
    }
    
    async update(req: Request, res: Response){
        res.end()
    }

    async delete(req: Request, res: Response){
        const id = req.params.id
        try{
            const link = await linkModel.findOneAndDelete({ id })
            res.json({"message":"deleted!"}).end()
        }catch{
            res.status(500).json({Error:"server error!"}).end()
        }
    }
}

export default new linkController()