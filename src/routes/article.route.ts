import { Router } from 'express'
import ArticleController from '../controllers/article.controller'
import validMiddleware from '../middleware/validate.middleware'
import { CreateArticleDto } from '../dto/article.dto'

const router = Router()
const articleController = new ArticleController()

router.get('/', articleController.getAllArticles)
router.get('/:id', articleController.getArticleById)
router.post('/', validMiddleware(CreateArticleDto, 'body'), articleController.createArticle)

export default router
