import { Response } from 'express'
import { RESPONSE_CODE, ResponseCodeValue } from './code'

interface ResponseData {
	code: number
	msg: string
	data: any
}

export const successResponse = (
	res: Response,
	data: any,
	codeValue: ResponseCodeValue = RESPONSE_CODE.SUCCESS
): void => {
	const responseData: ResponseData = { code: codeValue.code, msg: codeValue.msg, data }
	res.status(codeValue.code).json(responseData)
}

export const errorResponse = (
	res: Response,
	codeValue: ResponseCodeValue = RESPONSE_CODE.INTERNAL_SERVER_ERROR,
	msg = ''
): void => {
	const responseData: ResponseData = {
		code: codeValue.code,
		msg: msg || codeValue.msg,
		data: null
	}
	res.status(codeValue.code).json(responseData)
}
