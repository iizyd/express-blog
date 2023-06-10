import { Router } from 'express'
import ArticleController from '../controllers/article.controller'
import validMiddleware from '../middleware/validate.middleware'
import { CreateArticleDto, UpdateArticleDto } from '../dto/article.dto'
import authMiddleware from '../middleware/auth.middleware'

const router = Router()
const articleController = new ArticleController()

router.get('/', articleController.getAllArticles)
router.get('/:id', articleController.getArticleById)

router.post(
	'/',
	authMiddleware,
	validMiddleware(CreateArticleDto, 'body'),
	articleController.createArticle
)
router.delete('/:id', authMiddleware, articleController.deleteArticleById)
router.put(
	'/:id',
	authMiddleware,
	validMiddleware(UpdateArticleDto, 'body'),
	articleController.updateArticle
)

export default router
