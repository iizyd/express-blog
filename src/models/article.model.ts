import { Prisma, article } from '@prisma/client'
import db from '../common/db'
import { UpdateArticleDto } from '../dto/article.dto'

export interface Article extends article {}

class ArticleModel {
	public async getAll(skip: number, take: number): Promise<Article[]> {
		return await db.article.findMany({
			skip,
			take,
			include: {
				article_tag: true
			}
		})
	}

	public async getById(id: number): Promise<Article | null> {
		return await db.article.findFirst({ where: { id } })
	}

	public async create(data: Prisma.articleCreateInput): Promise<void> {
		await db.article.create({
			data,
			include: {
				article_tag: true
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

	public async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
		return await db.article.update({
			where: { id },
			data: updateArticleDto
		})
	}
}

export default new ArticleModel()
