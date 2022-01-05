import { Request, Response } from "express";
import { AuthenticateUserService } from "../service/AuthenticateUserService";

class AuthenticateUserControler{
    async handle(req:Request, res:Response){
      try{
        const {code} = req.body
        const service = new AuthenticateUserService()
        const result = await service.execute(code)
        return res.json( result)
      }catch(err:any){
        return res.json({error:true, message:err.message})
      }
     
    }
}
export {AuthenticateUserControler}