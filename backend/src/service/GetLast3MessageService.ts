import {prismaClient} from '../prisma' 

 class GetLast3MessageService{
   async execute(){
   const messages = await prismaClient.message.findMany({ //obtem vários(tres com filtro)
     take:3, //tamanho máximo
     orderBy:{ //ordem --utimos
        created_At: "desc"
     },
     include:{ //informações do usuario
       user:true
     }
   })

   return messages
  }
}

export {GetLast3MessageService}