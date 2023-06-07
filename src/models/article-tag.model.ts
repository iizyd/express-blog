class ArticleTagModel {}

// 根据报错信息来看，错误类型是 PrismaClientKnownRequestError，且错误代码为 P2002。这个错误代码是由于使用了重复的主键值，在 `article_tag` 表中出现了重复的 `(article_id, tag_id)` 组合，导致插入操作失败。

// 在你的更新文章的代码中，你使用了 Prisma 的 `update()` 方法，这个方法会将更新的数据以及对应的查询条件发送给数据库，由数据库执行更新操作。但是，由于你在更新文章的同时也更新了文章的标签，而标签与文章的关系是通过 `article_tag` 表来表示的，所以在更新标签时需要注意不要出现主键冲突的情况。

// 你在代码中提到“更新的时候，之前的标签需要清除”，我猜测是你试图在更新文章的同时，先删除该文章原有的标签，再添加新的标签。如果是这样，那么在删除操作之前，可以先根据文章ID查询出该文章原有的标签，并将它们从 `article_tag` 表中删除。这样一来，就可以避免重复插入数据了。

// 下面是一个可能的解决方案：

// ```ts
// public async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article | null> {
//   const article = await this.getById(id)

//   if (!article) {
//     return null
//   }

//   const { title, description, cover_image_url, content, published, tags } = updateArticleDto

//   // 1. 查询出该文章原有的标签
//   const oldTags = await this.getArticleTags(id)

//   // 2. 删除该文章原有的标签
//   await db.articleTag.deleteMany({
//     where: {
//       article_id: id,
//     },
//   })

//   // 3. 根据标签名称查询出对应的标签对象
//   const tagObjects = await tagModel.getByNames(tags)

//   // 4. 构造更新文章的数据
//   const updateArticleInput: Prisma.ArticleUpdateInput = {
//     title,
//     description,
//     cover_image_url,
//     content,
//     published,
//     tags: {
//       connect: tagObjects.map(tag => ({
//         id: tag.id,
//       })),
//     },
//   }

//   // 5. 更新文章
//   const updatedArticle = await db.article.update({
//     where: {
//       id,
//     },
//     data: updateArticleInput,
//   })

//   return updatedArticle
// }

// // 获取文章的标签
// private async getArticleTags(articleId: number): Promise<Tag[]> {
//   const rows = await db.articleTag.findMany({
//     where: {
//       article_id: articleId,
//     },
//     select: {
//       tag: true,
//     },
//   })
//   return rows.map(row => row.tag)
// }
// ```

// 这里通过调用 `getArticleTags()` 方法来获取该文章原有的标签，然后再调用 Prisma 的 `deleteMany()` 方法来删除它们。在构造更新文章数据时，使用 `connect` 来指定要关联的标签，这样可以避免插入重复的数据。最后调用 Prisma 的 `update()` 方法来更新文章。
