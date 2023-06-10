import db from '../common/db'

class ArticleTagModel {
	public async deleteArticleTagsByArticleId(articleId: number): Promise<void> {
		await db.articleTag.deleteMany({
			where: {
				article_id: articleId
			}
		})
	}
}

export default new ArticleTagModel()
