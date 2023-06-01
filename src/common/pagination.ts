import { Request } from 'express'
import CONFIG from '../config/config'

export const getPage = (req: Request): number => {
	let page = req.query.page ? +req.query.page : 1

	if (page < 0) {
		page = 1
	}
	return page
}

export const getPageSize = (req: Request): number => {
	const default_page_size: number = CONFIG.DEFAULT_PAGE_SIZE ? +CONFIG.DEFAULT_PAGE_SIZE : 10
	const max_page_size: number = CONFIG.MAX_PAGE_SIZE ? +CONFIG.MAX_PAGE_SIZE : 100

	let page_size = req.query.page_size ? +req.query.page_size : default_page_size

	if (page_size < 0) {
		page_size = default_page_size
	}

	if (page_size > max_page_size) {
		page_size = max_page_size
	}

	return page_size
}

export const getPageOffset = (page: number, pageSize: number): number => {
	let result = 0
	if (page > 0) {
		result = (page - 1) * pageSize
	}
	return result
}
