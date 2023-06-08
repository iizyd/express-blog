import { Router } from 'express'
import articleRouter from './article.route'
import tagRouter from './tag.route'
import authRouter from './auth.route'
import uploadRouter from './upload.route'

const apiRouter = Router()

apiRouter.use('/article', articleRouter)
apiRouter.use('/tag', tagRouter)
apiRouter.use('/login', authRouter)
apiRouter.use('/upload', uploadRouter)

export default apiRouter
