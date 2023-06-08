import { Request, Response } from 'express'
import { AuthDto } from '../dto/auth.dto'
import userService from '../services/user.service'
import { errorResponse, successResponse } from '../common/response'
import { RESPONSE_CODE } from '../common/code'
import { jwtSign } from '../util/jwt'

class AuthController {
	public async login(req: Request, res: Response) {
		const { username, password } = req.body as AuthDto
		const user = await userService.getUserByName(username)

		if (!user || user.password !== password) {
			return errorResponse(res, RESPONSE_CODE.UNAUTHORIZED, '用户名或密码错误')
		}

		const token = jwtSign({ id: user.id })
		res.set('Authorization', `Bearer ${token}`)
		successResponse(res, null)
	}
}

export default AuthController
