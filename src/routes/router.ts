import { Router } from 'express'
import articleRouter from './article.route'

const apiRouter = Router()

apiRouter.use('/article', articleRouter)

export default apiRouter
