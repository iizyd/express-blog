import articleModel, { Article } from '../models/article.model'
import { CreateArticleDto, UpdateArticleDto } from '../dto/article.dto'
import { getPageOffset } from '../common/pagination'

class ArticleService {
	public async getAll(
		page: number,
		pageSize: number
	): Promise<{ data: Article[]; total: number }> {
		const pageOffset = getPageOffset(page, pageSize)
		const articles = await articleModel.getAll(pageOffset, pageSize)
		const total = await articleModel.count()
		return {
			data: articles,
			total
		}
	}

	public async getById(id: number): Promise<Article | null> {
		return await articleModel.getById(id)
	}

	public async create(article: CreateArticleDto): Promise<void> {
		await articleModel.create(article)
	}

	public async delete(id: number): Promise<Article | null> {
		const article = await this.getById(id)

		if (article) {
			return await articleModel.deleteById(id)
		} else {
			return null
		}
	}

	public async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article | null> {
		const article = await this.getById(id)

		if (article) {
			return await articleModel.update(id, updateArticleDto)
		} else {
			return null
		}
	}
}

export default new ArticleService()
