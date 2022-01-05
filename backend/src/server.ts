import { serverHttp } from "./app"

const PORT = process.env.PORT || 3100
serverHttp.listen(PORT, ()=>{
  console.log(`Server run http://localhost:${PORT}`)
})

export {serverHttp}