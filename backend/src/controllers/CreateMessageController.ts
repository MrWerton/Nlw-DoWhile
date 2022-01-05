import { Request, Response } from "express";
import { CreateMessagerService } from "../service/CreateMessagerService";
class CreateMessagerController{
    async handle(req:Request, res:Response){
      try{
        const {message} = req.body
        const {user_id} = req
        const service = new CreateMessagerService()
        const result = await service.execute(message, user_id)
        return res.json(result)
      }catch(err){
        return res.json({error:true, message:err.message})
      }

      
    }
}
export {CreateMessagerController}