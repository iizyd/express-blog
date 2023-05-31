import articleModel, { Article } from '../models/article.model'
import { CreateArticleDto } from '../dto/article.dto'

class ArticleService {
	public async getAll(): Promise<Article[]> {
		return await articleModel.getAll()
	}

	public async getById(id: number): Promise<Article | null> {
		return await articleModel.getById(id)
	}

	public async create(article: CreateArticleDto): Promise<void> {
		await articleModel.create(article)
	}
}

export default new ArticleService()
