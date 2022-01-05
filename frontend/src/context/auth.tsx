import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

//informações do usuário --content api

interface User{
  name: string,
  avatar_url:string,
  id: string,
  login:string
}
interface AuthContextData{
  user: User | null,
  signInUrl: string,
  signOut: ()=> void
}
interface AuthProvider{
  children: ReactNode; //pode ser tudo
}
interface authResponse{
  token: string,
  user:{
    id: string,
    avatar_url: string,
    name: string,
    login: string
  }
}

const AuthContext = createContext({} as AuthContextData) //é dessa forma que se passa as tipagens nos contextos no react

function AuthProvider(props: AuthProvider){

  const [user, setUser] = useState<User | null>(null) //armazena o login do usuário. Ele pose ser User ou null (logado ou não logado)


  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=2076e4745bf14e96b6d4` //solicitação de autentificação

  async function signIn(githubCode:string){ //função para enviar o código para o backend
    

   const response = await api.post<authResponse>('authenticate',{ //solicitação do código 
      code: githubCode
    })
    const {token, user} = response.data //a rota obterá o user e o token

    
    localStorage.setItem('@dowhile:token', token) //tokem será salvo no localstorage
    
    api.defaults.headers.common.authorization = `Bearer ${token}` //tudo que parta daqui irá com o token de autentificação
    setUser(user)

  }
  function signOut(){ //saida do usuário
      setUser(null)
      localStorage.removeItem('@dowhile:token')
  }

  useEffect(()=>{//obter o token armazenado e permanecia do usuário logado
      const token = localStorage.getItem('@dowhile:token')

      if(token){
        api.defaults.headers.common.authorization = `Bearer ${token}` //tudo que parta daqui irá com o token de autentificação
        api.get<User>('profile').then(res=>{
          setUser(res.data)
        })
      }
  },[])

  useEffect(()=>{
    const url = window.location.href //busca a url
    const hasGithubCode = url.includes('?code=')  //verifica se a url possui o codigo

    if(hasGithubCode){
      const [urlWithoutCode, githubCod ] = url.split('?code=') //divide o código em dois, antes e depois de ?code=

      window.history.pushState({}, '', urlWithoutCode) // limpa a url do navegador
      signIn(githubCod) 
    }
  }, [])
  return(
   <AuthContext.Provider value={{signInUrl, user, signOut}}>  {/*tudo aqui dentro possui acesso ao contexto(informações do usuário*/}
     {props.children} 
   </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}