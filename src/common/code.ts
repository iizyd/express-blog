export interface ResponseCodeValue {
	code: number
	msg: string
}

export const RESPONSE_CODE = {
	SUCCESS: { code: 200, msg: '成功' },
	BAD_REQUEST: { code: 400, msg: '参数错误' },
	UNAUTHORIZED: { code: 401, msg: '未登录' },
	FORBIDDEN: { code: 403, msg: '未授权' },
	NOT_FOUND: { code: 404, msg: '未找到' },
	INTERNAL_SERVER_ERROR: { code: 500, msg: '服务器错误' }
}
