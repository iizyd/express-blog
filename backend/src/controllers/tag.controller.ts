import { Request, Response } from 'express'
import { getPage, getPageSize } from '../common/pagination'
import tagService from '../services/tag.service'
import { errorResponse, successResponse } from '../common/response'
import { RESPONSE_CODE } from '../common/code'
import { CreateTagDto } from '../dto/tag.dto'

export default class TagController {
	public async getAllTags(req: Request, res: Response) {
		const page = getPage(req)
		const pageSize = getPageSize(req)
		const result = await tagService.getAll(page, pageSize)

		successResponse(res, {
			total: result.total,
			page,
			page_size: pageSize,
			data: result.data
		})
	}

	public async getTagById(req: Request, res: Response) {
		const id = +req.params.id || 0
		const tag = await tagService.getById(id)

		if (tag) {
			successResponse(res, tag)
		} else {
			errorResponse(res, RESPONSE_CODE.NOT_FOUND)
		}
	}

	public async createTag(req: Request, res: Response) {
		const createTagDto: CreateTagDto = req.body
		await tagService.create(createTagDto)

		successResponse(res, null)
	}

	public async updateTag(req: Request, res: Response) {
		const id = +req.params.id || 0
		const updateTagDto: CreateTagDto = req.body
		const tag = await tagService.update(id, updateTagDto)

		if (tag) {
			successResponse(res, null)
		} else {
			errorResponse(res, RESPONSE_CODE.NOT_FOUND)
		}
	}

	public async deleteTag(req: Request, res: Response) {
		const id = +req.params.id || 0
		const tag = await tagService.delete(id)

		if (tag) {
			successResponse(res, null)
		} else {
			errorResponse(res, RESPONSE_CODE.NOT_FOUND)
		}
	}
}
