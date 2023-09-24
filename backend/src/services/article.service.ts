import articleModel from '../models/article.model'
import { CreateArticleDto, UpdateArticleDto } from '../dto/article.dto'
import { getPageOffset } from '../common/pagination'
import tagModel from '../models/tag.model'
import { Article, Prisma } from '@prisma/client'
import articleTagModel from '../models/article-tag.model'
import formatDateString from '../util/date-format'

type ArticleTypeToString<T> = {
	[P in keyof T]: T[P] extends Date | null ? string | null : T[P]
}
interface ArticleItem extends ArticleTypeToString<Article> {
	tags: number[]
}

class ArticleService {
	public async getAll(
		page: number,
		pageSize: number,
		published?: boolean,
		tagId?: number
	): Promise<{ data: ArticleItem[]; total: number }> {
		const pageOffset = getPageOffset(page, pageSize)
		const articles = await articleModel.getAll(pageOffset, pageSize, published, tagId)
		const total = await articleModel.count(published, tagId)

		const resultArticles: ArticleItem[] = articles.map(article => {
			return {
				...article,
				created_at: formatDateString(article.created_at),
				modified_at: formatDateString(article.modified_at),
				tags: article.tags.map(articleTag => {
					return articleTag.tag_id
				})
			}
		})

		return {
			data: resultArticles,
			total
		}
	}

	public async getById(id: number): Promise<ArticleItem | null> {
		const article = await articleModel.getById(id)

		if (article) {
			const resultArticle: ArticleItem = {
				...article,
				created_at: formatDateString(article.created_at),
				modified_at: formatDateString(article.modified_at),
				tags: article.tags.map(articleTag => {
					return articleTag.tag_id
				})
			}
			return resultArticle
		} else {
			return null
		}
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
			await articleTagModel.deleteArticleTagsByArticleId(id)

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

			return await articleModel.update(id, updateArticleInput)
		} else {
			return null
		}
	}
}

export default new ArticleService()
