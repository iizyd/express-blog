import { Router } from 'express'
import ArticleController from '../controllers/article.controller';

const router = Router();
const articleController = new ArticleController()

router.get('/', articleController.getAllArticles)

export default router