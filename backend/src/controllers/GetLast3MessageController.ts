import { Request, Response } from "express";
import { GetLast3MessageService } from "../service/GetLast3MessageService";

class GetLast3MessageController{
    async handle(req:Request, res:Response){
      try{
        const service = new GetLast3MessageService();
        const result = await service.execute();
        return res.json(result) 
      }catch(err){
        return res.json({error:true, message:err.message})
      }

      
    }
}
export {GetLast3MessageController}