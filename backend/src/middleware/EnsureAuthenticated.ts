import { Request, Response, NextFunction } from "express";
import {verify} from 'jsonwebtoken' //verificar o token

//tipade do sub
interface IPayLoad{
  sub: string
}
//validar autentificação

export function EnsureAuthenticated(req:Request,res:Response,next:NextFunction ){
  const authToken = req.headers.authorization

  if(!authToken){
    return res.status(401).json({
      errorCode: "token.invalid",

    })
  }
  //o token vem dentro de um bearer (Bearer 1214ADc4CACDADCDD) [, tokem] - primeiro parametro é ignorado e só se obtem o token
  //[01] - bear
  //[02] - 1214ADc4CACDADCDD
  const [, token] = authToken.split(" ")//separa por espaço
  try{
    const {sub} = verify(token, process.env.JWT_SECRET) as IPayLoad//sub pega o id do usuários
    req.user_id = sub

    return next() //repassa pra frente
  }catch(err){
    return res.status(401).json(
      {errorCode: "token.expired"}
    )
  }
}