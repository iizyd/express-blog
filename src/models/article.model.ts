import { blog_article } from '@prisma/client'
import db from '../common/db'
import { CreateArticleDto } from '../dto/article.dto'

export interface Article extends blog_article {}

class ArticleModel {
	public async getAll(skip: number, take: number): Promise<Article[]> {
		return await db.blog_article.findMany({
			skip,
			take
		})
	}

	public async getById(id: number): Promise<Article | null> {
		return await db.blog_article.findFirst({ where: { id } })
	}

	public async create(createArticleDto: CreateArticleDto): Promise<void> {
		await db.blog_article.create({ data: createArticleDto })
	}

	public async count(): Promise<number> {
		return await db.blog_article.count()
	}

	public async deleteById(id: number): Promise<Article> {
		return await db.blog_article.delete({
			where: {
				id
			}
		})
	}
}

export default new ArticleModel()
