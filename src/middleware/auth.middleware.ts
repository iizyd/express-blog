import { NextFunction, Request, Response } from 'express'
import { errorResponse } from '../common/response'
import { RESPONSE_CODE } from '../common/code'
import { jwtVerify } from '../util/jwt'
import userService from '../services/user.service'

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const authHeader = (req.headers.authorization ?? '') as string
	const token = authHeader.split(' ')[1]

	if (!token) {
		return errorResponse(res, RESPONSE_CODE.UNAUTHORIZED)
	}

	const { verifyResult, decode } = await jwtVerify(token)

	if (verifyResult) {
		const userId = decode?.id
		const user = await userService.getUserById(userId)

		if (!user) {
			return errorResponse(res, RESPONSE_CODE.UNAUTHORIZED)
		} else {
			req.user = user
		}
	} else {
		return errorResponse(res, RESPONSE_CODE.UNAUTHORIZED)
	}
	next()
}

export default authMiddleware
