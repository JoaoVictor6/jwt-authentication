import { Router } from "express"
import AuthController from "./src/app/Controllers/AuthController"
import UserController from "./src/app/Controllers/UserController"
import authMiddleware from "./src/app/Middlewares/authMiddlewares"

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/authenticate', AuthController.authenticate)
routes.get('/users', authMiddleware, AuthController.index)

export default routes