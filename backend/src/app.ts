import express, { Application, NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import bodyParser from 'body-parser'
import apiRouter from './routes/router'
import { errorResponse } from './common/response'
import './common/db'
import { RESPONSE_CODE } from './common/code'
import CONFIG from './config/config'
import logger from './util/logger'
import cors from 'cors'

const app: Application = express()
const port = CONFIG.PORT

app.use(
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true, // 允许发送身份验证凭证（如 cookies）
		optionsSuccessStatus: 200 // 设置预检请求的返回状态码
	})
)
app.use(bodyParser.json())
// 日志记录
app.use((req: Request, res: Response, next: NextFunction) => {
	const start = Date.now()
	res.on('finish', () => {
		const elapsed = Date.now() - start
		const log = {
			level: 'info',
			message: `${req.method} ${req.path} ${req.url} ${res.statusCode} ${elapsed}ms`
		}
		logger.log(log)
	})
	next()
})
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('hello')
})

app.use('/api', apiRouter)
// 静态资源
app.use('/uploads', express.static('src/storage/uploads'))

// 错误处理
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	const message = err.message || '服务器错误'
	const stack = err.stack || ''
	const timestamp = new Date().toISOString()

	logger.error({
		level: 'error',
		message,
		stack,
		timestamp
	})
	errorResponse(res, RESPONSE_CODE.INTERNAL_SERVER_ERROR)
	next()
})

app.listen(port, () => {
	console.log(`Server is listening on http://127.0.0.1:${port}`)
})
