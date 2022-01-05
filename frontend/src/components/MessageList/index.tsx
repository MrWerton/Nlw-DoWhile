import styles from './style.module.scss'
import Logo from '../../assets/logo.svg'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

interface Message{
  id: string,
  text: string,
  user:{
    name: string,
    avatar_url:string,
  }
}
const messageQueue: Message[] = [] //cria uma array para armazenas as mensagens

const socket = io('http://localhost:3100') //endereço backend 

socket.on('new_message', (newMessage:Message)=>{ //socket cria a mensagem
  messageQueue.push(newMessage)
})

 
function MessageList() {

    const [messages, setMessages] = useState<Message[]>([])
 //cria um useefect paramostart as messagens a cada 3segund com um filtro que filtra valores nulos
    useEffect(()=>{
      setInterval(()=>{
        if(messageQueue.length > 0){
          setMessages(prevState =>[//ajuda a manter as mensagens
            messageQueue[0],
            prevState[0],
            prevState[1]
          ].filter(Boolean))
          messageQueue.shift() //remove o item mais antigo da fila
        }
      }, 1000)
    },[])

    useEffect(()=>{
      api.get<Message[]>('messages/last3').then(res=>{
        setMessages(res.data)
      })
    }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={Logo} alt="logo"/>
      <ul className={styles.messageList}>
       {messages.map(message =>{
          return (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.UserImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export {MessageList}
