import { Router } from 'express'
import articleRouter from './article.route'
import tagRouter from './tag.route'

const apiRouter = Router()

apiRouter.use('/article', articleRouter)
apiRouter.use('/tag', tagRouter)

export default apiRouter
