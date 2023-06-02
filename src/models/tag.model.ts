import { blog_tag } from '@prisma/client'
import db from '../common/db'
import { CreateTagDto } from '../dto/tag.dto'

export interface Tag extends blog_tag {}

class TagModel {
	public async getAll(pageOffset: number, pageSize: number): Promise<Tag[]> {
		return await db.blog_tag.findMany({
			skip: pageOffset,
			take: pageSize
		})
	}

	public async getById(id: number): Promise<Tag | null> {
		return await db.blog_tag.findFirst({
			where: { id }
		})
	}

	public async create(createTagDto: CreateTagDto): Promise<Tag> {
		return await db.blog_tag.create({
			data: createTagDto
		})
	}

	public async update(id: number, updateTagDto: CreateTagDto): Promise<Tag> {
		return await db.blog_tag.update({
			where: { id },
			data: updateTagDto
		})
	}

	public async delete(id: number): Promise<Tag> {
		return await db.blog_tag.delete({
			where: { id }
		})
	}

	public async count(): Promise<number> {
		return await db.blog_tag.count()
	}
}

export default new TagModel()
