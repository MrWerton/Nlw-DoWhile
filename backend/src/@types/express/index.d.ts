
//sobrescrever biblioteca para compressão do ts

declare namespace Express{
  export interface Request{
      user_id: string
  }
}