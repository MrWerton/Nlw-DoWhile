import {prismaClient} from '../prisma' 
import {io} from '../app'

 class CreateMessagerService{
   async execute(text: string, user_id:string){
    const message = await prismaClient.message.create({
      data:{
        text,
        user_id
      },
      include:{ //inclue os dados do usuario
        user:true
      }
    })
    const infoWS = { //o que será omitido para o usuário
      text: message.text,
      user_id: message.user_id,
      created_At:message.created_At,
      user:{
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    }
    io.emit("new_message", infoWS)
    return message
  }
}

export {CreateMessagerService}