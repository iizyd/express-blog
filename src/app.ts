import express, { Application, NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import bodyParser from 'body-parser'
import apiRouter from './routes/router'
import { errorResponse } from './common/response'
import './common/db'
import { RESPONSE_CODE } from './common/code'
import CONFIG from './config/config'

const app: Application = express()
const port = CONFIG.PORT

app.use(bodyParser.json())
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('hello')
})

app.use('/api', apiRouter)

// 错误处理
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	console.error('[GLOBAL_ERROR]: ', err)
	errorResponse(res, RESPONSE_CODE.INTERNAL_SERVER_ERROR)
})

app.listen(port, () => {
	console.log(`Server is listening on http://127.0.0.1:${port}`)
})
