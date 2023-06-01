import { blog_article } from '@prisma/client'
import db from '../common/db'
import { CreateArticleDto } from '../dto/article.dto'

export interface Article extends blog_article {}

class ArticleModel {
	public async getAll(): Promise<Article[]> {
		return await db.blog_article.findMany()
	}

	public async getById(id: number): Promise<Article | null> {
		return await db.blog_article.findFirst({ where: { id } })
	}

	public async create(createArticleDto: CreateArticleDto): Promise<void> {
		await db.blog_article.create({ data: createArticleDto })
	}
}

export default new ArticleModel()
