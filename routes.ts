import { Router } from "express"
import UserController from "./src/app/Controllers/UserController"

const routes = Router()

routes.post('/users', UserController.store)

export default routes