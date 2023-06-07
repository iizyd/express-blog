import { Prisma, Article, ArticleTag } from '@prisma/client'
import db from '../common/db'

class ArticleModel {
	public async getAll(
		skip: number,
		take: number
	): Promise<
		(Article & {
			tags: ArticleTag[]
		})[]
	> {
		return await db.article.findMany({
			skip,
			take,
			include: {
				tags: true
			}
		})
	}

	public async getById(id: number): Promise<Article | null> {
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

	public async count(): Promise<number> {
		return await db.article.count()
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
