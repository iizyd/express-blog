import { Request, Response } from 'express'
import db from '../util/db'
import { successResponse } from '../common/response'
import { CreateArticleDto } from '../dto/article.dto'

export default class ArticleController {
	public async getAllArticles(req: Request, res: Response) {
		const allArticles = await db.blog_article.findMany()
		successResponse(res, allArticles)
	}

	public async getArticleById(req: Request, res: Response) {
		const id = +req.params.id || 0
		const article = await db.blog_article.findFirst({ where: { id } })
		successResponse(res, article)
	}

	public async createArticle(req: Request, res: Response) {
		const createArticleDto: CreateArticleDto = req.body

		await db.blog_article.create({
			data: createArticleDto
		})
		successResponse(res, null)
	}
}
