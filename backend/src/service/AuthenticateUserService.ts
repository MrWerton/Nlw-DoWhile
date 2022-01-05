import axios from 'axios'
import {prismaClient} from '../prisma' //faz a conexão com bd
import {sign} from 'jsonwebtoken' //função para criar token e autentificar-se

//usado para filtrar a coleta
interface IAcessTokenResponse{
  access_token: string
}
interface IUserResponse{
  avatar_url: string,
  login: string,
  id: number,
  name: string
}
class AuthenticateUserService{
  async execute(code: String){
  const url ="http://github.com/login/oauth/access_token"
  const {data: acessTokenResponse} = await axios.post<IAcessTokenResponse>(url, null,{
    params:{
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    },
    headers:{
      "Accept":"application/json"
    }
  })
  const response = await axios.get<IUserResponse>("http://api.github.com/user",{
    headers:{
      authorization: `Bearer ${acessTokenResponse.access_token}`
    }
  })
  //verificar se o usuário está logado
  const {login, name, id, avatar_url} = response.data
  let user = await prismaClient.user.findFirst({
    where:{
      github_id: id
    }
  })
  //caso não exista, cria-se usuário
  if(!user){
    user = await prismaClient.user.create({
      data:{
        github_id: id,
        login,
        name,
        avatar_url
      }
    })
  }
  //autentificação
    const token = sign({
      user:{
        name: user.name,
        avatar_url: user.avatar_url,
        login: user.login
      }
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: "1d"
    })
  return {token, user}
  }
}
export {AuthenticateUserService}