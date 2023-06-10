import jwt from 'jsonwebtoken'

export interface SignPayload {
	id: number
}

const secret = 'test_secret'
const expiresIn = '1h'

export const jwtSign = (payload: SignPayload): string => {
	return jwt.sign(payload, secret, { expiresIn })
}

export const jwtVerify = (
	token: string
): Promise<{ verifyResult: boolean; decode: jwt.JwtPayload | null }> => {
	return new Promise(resolve => {
		jwt.verify(token, secret, async (err, decode) => {
			if (err) {
				return resolve({ verifyResult: false, decode: null })
			}

			return resolve({
				verifyResult: true,
				decode: decode as jwt.JwtPayload
			})
		})
	})
}
