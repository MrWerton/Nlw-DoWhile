import styles from './style.module.scss'
import background from '../../assets/background.svg'
import { useContext, useState, FormEvent } from 'react'
import { AuthContext } from '../../context/auth'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { api } from '../../services/api'


export function SendMessageForm() {
  const {user, signOut} = useContext(AuthContext)
  const [message, setMessage] = useState('')  //state para armazenar o texto digitado
  
  async function handleSendMessager(event:FormEvent){
    event.preventDefault() //asegura que a pagina não seja recarregada 
    if(!message.trim()){ {/*verifica se o texto está vázio e o trim remove os espaços em branco */}
      return
    }
    await api.post('message', {message})

    setMessage('')//limpa o campo
  }
  return (

    <div className={styles.main}>
      <div className={styles.sendMessageFormWrapper}>
        <div className={styles.form}>
          <div className={styles.header}>
        <button onClick={signOut}>
          <VscSignOut/>
        </button>
          </div>
        <div className={styles.Container}>
          <div className={styles.User}>
            <div className={styles.UserImage}>
              <img src={user?.avatar_url} alt={user?.name} />
            </div>
            <div className={styles.UserInfo}>
              <strong>{user?.name}</strong>
              <span>
                <VscGithubInverted/>
                {user?.login}
              </span>
            </div>
          </div>

          <form  onSubmit={handleSendMessager} className={styles.formMessager}>
              <label htmlFor="message">Message</label>
              <textarea 
              name="message"
              maxLength={200}
 
              id="message" 
              placeholder="Qual é sua expectativa para o evento?"
              onChange={event=>setMessage(event.target.value)} /*forma de pegar o texto digitado */
              value={message} //assegura que caso o state message seja prenchido de outra forma, isso reflita no texarea
              />
              <div className={styles.btnSendMessager}>
                <button type="submit">Enviar Mensagem</button>
              </div>
            </form>
        </div>
      </div>
        </div>
        
      <div className={styles.background}>
        <img src={background} alt="background" />
      </div>
    </div>
  )
}
