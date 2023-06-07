import articleModel, { Article } from '../models/article.model'
import { CreateArticleDto, UpdateArticleDto } from '../dto/article.dto'
import { getPageOffset } from '../common/pagination'
import tagModel from '../models/tag.model'
import { Prisma } from '@prisma/client'

class ArticleService {
	public async getAll(
		page: number,
		pageSize: number
	): Promise<{ data: Article[]; total: number }> {
		const pageOffset = getPageOffset(page, pageSize)
		const articles = await articleModel.getAll(pageOffset, pageSize)
		const total = await articleModel.count()

		const resultArticle = articles.map((article) => {
			article.tags = article.article_tag
			return article
		})
		return {
			data: resultArticle,
			total
		}
	}

	public async getById(id: number): Promise<Article | null> {
		return await articleModel.getById(id)
	}

	public async create(createArticleDto: CreateArticleDto): Promise<void> {
		const { title, description, cover_image_url, content, state, tags } = createArticleDto
		const tagObjects = await tagModel.getManyByIds(tags)

		const createArticleInput: Prisma.articleCreateInput = {
			title,
			description,
			cover_image_url,
			content,
			state,
			article_tag: {
				create: tagObjects.map(tag => ({ tag: { connect: { id: tag.id } } }))
			}
		}

		await articleModel.create(createArticleInput)
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
