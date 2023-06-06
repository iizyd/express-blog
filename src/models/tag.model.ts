import { tag } from '@prisma/client'
import db from '../common/db'
import { CreateTagDto } from '../dto/tag.dto'

export interface Tag extends tag {}

class TagModel {
	public async getAll(pageOffset: number, pageSize: number): Promise<Tag[]> {
		return await db.tag.findMany({
			skip: pageOffset,
			take: pageSize
		})
	}

	public async getById(id: number): Promise<Tag | null> {
		return await db.tag.findFirst({
			where: { id }
		})
	}

	public async getManyByIds(ids: number[]): Promise<Tag[]> {
		return await db.tag.findMany({
			where: {
				id: {
					in: ids
				}
			}
		})
	}

	public async create(createTagDto: CreateTagDto): Promise<Tag> {
		return await db.tag.create({
			data: createTagDto
		})
	}

	public async update(id: number, updateTagDto: CreateTagDto): Promise<Tag> {
		return await db.tag.update({
			where: { id },
			data: updateTagDto
		})
	}

	public async delete(id: number): Promise<Tag> {
		return await db.tag.delete({
			where: { id }
		})
	}

	public async count(): Promise<number> {
		return await db.tag.count()
	}
}

export default new TagModel()
