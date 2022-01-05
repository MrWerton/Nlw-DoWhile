import 'dotenv/config' //acessaro o .env
import express, {Request, Response} from 'express';
import http from 'http'
import { Server, Socket } from 'socket.io';
import cors from 'cors'

import {router} from './routes'


const app = express()
app.use(cors())

const serverHttp = http.createServer(app) //para poder usar o socket.io e também é quem irá subir o servidor

const io = new Server(serverHttp, {
  cors:{
    origin: "*" //qualquer origem pode concetar com o httpa e websocket
  }
}) //acesso a io do cliente

io.on("connection", socket =>{
  console.log(`Usuário conectado no socket ${socket.id}`)
}) //Ouvir eventos

app.use(express.json())
app.use(router)


app.get('/github', (req:Request, res:Response)=>{
    res.redirect(`http://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)//conexão com github
})
app.get('/signin/callback', (req:Request, res:Response)=>{
   const {code} = req.query
   return res.json(code)
})

export {serverHttp, io} //possibilita a criação de um evento no createMessager


