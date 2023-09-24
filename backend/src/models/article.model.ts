import { Prisma, Article, ArticleTag } from '@prisma/client'
import db from '../common/db'

class ArticleModel {
	public async getAll(
		skip: number,
		take: number,
		published?: boolean,
		tagId?: number
	): Promise<
		(Article & {
			tags: ArticleTag[]
		})[]
	> {
		return await db.article.findMany({
			skip,
			take,
			orderBy: [{ created_at: 'desc' }],
			where: {
				published: published === undefined ? undefined : published,
				tags: tagId
					? {
							some: {
								tag_id: {
									in: [tagId]
								}
							}
					  }
					: undefined
			},
			include: {
				tags: true
			}
		})
	}

	public async getById(id: number): Promise<
		| (Article & {
				tags: ArticleTag[]
		  })
		| null
	> {
		return await db.article.findFirst({ where: { id }, include: { tags: true } })
	}

	public async create(data: Prisma.ArticleCreateInput): Promise<
		Article & {
			tags: ArticleTag[]
		}
	> {
		return await db.article.create({
			data,
			include: {
				tags: true
			}
		})
	}

	public async count(published?: boolean, tagId?: number): Promise<number> {
		return await db.article.count({
			where: {
				published: published === undefined ? undefined : published,
				tags: tagId
					? {
							some: {
								tag_id: {
									in: [tagId]
								}
							}
					  }
					: undefined
			}
		})
	}

	public async deleteById(id: number): Promise<Article> {
		return await db.article.delete({
			where: {
				id
			}
		})
	}

	public async update(id: number, data: Prisma.ArticleUpdateInput): Promise<Article> {
		return await db.article.update({
			where: { id },
			data
		})
	}
}

export default new ArticleModel()
