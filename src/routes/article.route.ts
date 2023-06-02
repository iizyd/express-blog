import { Router } from 'express'
import ArticleController from '../controllers/article.controller'
import validMiddleware from '../middleware/validate.middleware'
import { CreateArticleDto, UpdateArticleDto } from '../dto/article.dto'

const router = Router()
const articleController = new ArticleController()

router.get('/', articleController.getAllArticles)
router.get('/:id', articleController.getArticleById)
router.post('/', validMiddleware(CreateArticleDto, 'body'), articleController.createArticle)
router.delete('/:id', articleController.deleteArticleById)
router.put('/:id', validMiddleware(UpdateArticleDto, 'body'), articleController.updateArticle)

export default router
