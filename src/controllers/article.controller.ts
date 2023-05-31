import { Request, Response } from 'express'
import { errorResponse, successResponse } from '../common/response'
import { CreateArticleDto } from '../dto/article.dto'
import { RESPONSE_CODE } from '../common/code'
import articleService from '../services/article.service'

export default class ArticleController {
	public async getAllArticles(req: Request, res: Response) {
		const allArticles = await articleService.getAll()
		successResponse(res, allArticles)
	}

	public async getArticleById(req: Request, res: Response) {
		const id = +req.params.id || 0
		const article = await articleService.getById(id)

		if (article) {
			return successResponse(res, article)
		} else {
			errorResponse(res, RESPONSE_CODE.NOT_FOUND)
		}
	}

	public async createArticle(req: Request, res: Response) {
		const createArticleDto: CreateArticleDto = req.body

		await articleService.create(createArticleDto)
		successResponse(res, null)
	}
}
