import articleModel from '../models/article.model'
import { CreateArticleDto, UpdateArticleDto } from '../dto/article.dto'
import { getPageOffset } from '../common/pagination'
import tagModel from '../models/tag.model'
import { Article, ArticleTag, Prisma } from '@prisma/client'

class ArticleService {
	public async getAll(
		page: number,
		pageSize: number
	): Promise<{ data: (Article & { tags: ArticleTag[] })[]; total: number }> {
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

	public async create(createArticleDto: CreateArticleDto): Promise<void> {
		const { title, description, cover_image_url, content, published, tags } = createArticleDto
		const tagObjects = await tagModel.getManyByIds(tags)

		const createArticleInput: Prisma.ArticleCreateInput = {
			title,
			description,
			cover_image_url,
			content,
			published,
			tags: {
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
			const { title, description, cover_image_url, content, published, tags } =
				updateArticleDto
			const tagObjects = await tagModel.getManyByIds(tags)
			// 更新的时候，之前的标签需要清除，已经存在的再次请求会出错

			const updateArticleInput: Prisma.ArticleUpdateInput = {
				title,
				description,
				cover_image_url,
				content,
				published,
				tags: {
					create: tagObjects.map(tag => ({ tag: { connect: { id: tag.id } } }))
				}
			}
			let result: any = null
			try {
				result = await articleModel.update(id, updateArticleInput)
			} catch (err) {
				console.log(err)
			}

			return result
		} else {
			return null
		}
	}
}

export default new ArticleService()
