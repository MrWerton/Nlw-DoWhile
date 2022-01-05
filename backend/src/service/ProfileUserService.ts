
import {prismaClient} from '../prisma' 

 class ProfileUserService{
   async execute(user_id: string){
   const user = await prismaClient.user.findFirst({//obtem apenas 1
      where:{  //where =onde -> irá comparar
        id: user_id 
      }
   })

   return user
  }
}

export {ProfileUserService}