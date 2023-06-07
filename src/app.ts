import express, { Application, NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import bodyParser from 'body-parser'
import apiRouter from './routes/router'
import { errorResponse } from './common/response'
import './common/db'
import { RESPONSE_CODE } from './common/code'
import CONFIG from './config/config'
import logger from './util/logger'

const app: Application = express()
const port = CONFIG.PORT

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
