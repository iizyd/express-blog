import { Request, Response } from 'express'
import { errorResponse, successResponse } from '../common/response'
import { CreateArticleDto, UpdateArticleDto } from '../dto/article.dto'
import { RESPONSE_CODE } from '../common/code'
import articleService from '../services/article.service'
import { getPage, getPageSize } from '../common/pagination'

export default class ArticleController {
	public async getAllArticles(req: Request, res: Response) {
		const page = getPage(req)
		const pageSize = getPageSize(req)
		const result = await articleService.getAll(page, pageSize)
		successResponse(res, {
			total: result.total,
			page,
			page_size: pageSize,
			data: result.data
		})
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

	public async deleteArticleById(req: Request, res: Response) {
		const id = +req.params.id || 0
		const article = await articleService.delete(id)

		if (article) {
			return successResponse(res, null)
		} else {
			return errorResponse(res, RESPONSE_CODE.NOT_FOUND)
		}
	}

	public async updateArticle(req: Request, res: Response) {
		const id = +req.params.id || 0
		const updateArticleDto: UpdateArticleDto = req.body
		const article = await articleService.update(id, updateArticleDto)

		if (article) {
			successResponse(res, null)
		} else {
			errorResponse(res, RESPONSE_CODE.NOT_FOUND)
		}
	}
}
