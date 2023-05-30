import { Response } from 'express'
import { RESPONSE_CODE } from './code'

interface ResponseData {
	code: number
	msg: string
	data: any
}

export const successResponse = (res: Response, data: any, code = RESPONSE_CODE.SUCCESS): void => {
	const responseData: ResponseData = { code, msg: '成功', data }
	res.status(code).json(responseData)
}

export const errorResponse = (
	res: Response,
	code = RESPONSE_CODE.INTERNAL_SERVER_ERROR,
	msg = '失败'
): void => {
	const responseData: ResponseData = { code, msg, data: null }
	res.status(code).json(responseData)
}
