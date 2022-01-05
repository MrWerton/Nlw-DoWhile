import { Router } from "express";
import { AuthenticateUserControler } from "./controllers/AuthenticateUserController";
import { CreateMessagerController } from "./controllers/CreateMessageController";
import { GetLast3MessageController } from "./controllers/GetLast3MessageController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { EnsureAuthenticated } from "./middleware/EnsureAuthenticated";

const router = Router()

router.post("/authenticate", new AuthenticateUserControler().handle)
router.post("/message", EnsureAuthenticated, new CreateMessagerController().handle) //ensure autenticade entre a rota e funcionalidade(next-> se estiver autenticado)

router.get('/messages/last3', new GetLast3MessageController().handle)
router.get('/profile', EnsureAuthenticated, new ProfileUserController().handle)
export {router}