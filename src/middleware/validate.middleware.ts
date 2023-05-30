import { NextFunction, Request, Response } from 'express'
import { errorResponse } from '../common/response'
import { RESPONSE_CODE } from '../common/code'
import { ValidationError, validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

const validMiddleware =
	<T extends object>(DtoClass: new () => T, property: 'body' | 'query' | 'params') =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dto = plainToClass(DtoClass, req[property])
			const errors: ValidationError[] = await validate(dto)

			if (errors.length > 0) {
				return errorResponse(
					res,
					RESPONSE_CODE.BAD_REQUEST,
					errors.map(e => Object.values(e.constraints || {})).join(',')
				)
			}

			next()
		} catch (err) {
			errorResponse(res, RESPONSE_CODE.INTERNAL_SERVER_ERROR)
		}
	}

export default validMiddleware
