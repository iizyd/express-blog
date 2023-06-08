import { Del, Get, Post, Put } from './axios'

const apis = {
	// 获取文章列表
	getArticles: (data: any = {}) => Get('/api/article', data),

	// 获取单个文章
	getArticle: (id: string | number) => Get(`/api/article/${id}`, {}),

	// 删除单个文章
	delArticle: (id: string | number) => Del(`/api/article/${id}`, {}),

	// 修改文章
	updateArticle: (id: string | number, data: any) => Put(`/api/article/${id}`, data),

	// 创建文章
	createArticle: (data: any) => Post(`/api/article`, data),

	// 上传文件
	uploadFile: (data: any = {}) =>
		Post('/upload', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}),

	// 获取标签列表
	getTags: (data: any = {}) => Get('/api/tag', data),

	// 创建标签
	createTag: (data: { name: string }) => Post(`/api/tag`, data),

	// 修改标签
	updateTag: (id: number, data: { name?: string }) => Put(`/api/tag/${id}`, data),

	// 删除标签
	delTag: (id: string | number) => Del(`/api/tag/${id}`, {}),

	// 登录
	Login: (data: { username: string; password: string }) => Post('/api/login', data)
}

export default apis
