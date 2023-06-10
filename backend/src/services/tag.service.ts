import { Tag } from '@prisma/client'
import { getPageOffset } from '../common/pagination'
import { CreateTagDto } from '../dto/tag.dto'
import tagModel from '../models/tag.model'

class TagService {
	public async getAll(page: number, pageSize: number): Promise<{ data: Tag[]; total: number }> {
		const pageOffset = getPageOffset(page, pageSize)
		const total = await tagModel.count()
		const tags = await tagModel.getAll(pageOffset, pageSize)
		return {
			data: tags,
			total
		}
	}

	public async getById(id: number): Promise<Tag | null> {
		return await tagModel.getById(id)
	}

	public async create(createTagDto: CreateTagDto): Promise<Tag> {
		return await tagModel.create(createTagDto)
	}

	public async update(id: number, createTagDto: CreateTagDto): Promise<Tag | null> {
		const tag = await tagModel.getById(id)

		if (tag) {
			return await tagModel.update(id, createTagDto)
		} else {
			return null
		}
	}

	public async delete(id: number): Promise<Tag | null> {
		const tag = await tagModel.getById(id)

		if (tag) {
			return await tagModel.delete(id)
		} else {
			return null
		}
	}
}

export default new TagService()
