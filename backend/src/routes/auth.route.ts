import { Router } from 'express'
import validMiddleware from '../middleware/validate.middleware'
import { AuthDto } from '../dto/auth.dto'
import AuthController from '../controllers/auth.controller'

const router = Router()
const authController = new AuthController()

router.post('/', validMiddleware(AuthDto, 'body'), authController.login)

export default router
