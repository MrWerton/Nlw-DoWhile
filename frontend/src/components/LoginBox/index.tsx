import styles from './style.module.scss'
import Banner from '../../assets/banner-girl.png'
import {VscGithubInverted} from 'react-icons/vsc'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'


export function LoginBox() {  
  const {signInUrl} = useContext(AuthContext)
  return (
    <div className={styles.main}>
      <div className={styles.loginBoxWrapper}>
        <img src={Banner} alt="Banner girl" />
          <strong className={styles.textLoginBox}>
            Entre e compartilhe sua mensagem
        </strong>
        <a href={signInUrl} className={styles.signInWithGitHub}> 
          <VscGithubInverted/>
            Entrar com Github
        </a>

      </div>

    </div>
  )
}


