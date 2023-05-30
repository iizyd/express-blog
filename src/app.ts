import express, { Application, NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import bodyParser from 'body-parser'
import apiRouter from './routes/router'
import { errorResponse } from './common/response'
import './common/db'

const app: Application = express()
const port = 9000

app.use(bodyParser.json())
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('hello')
})

app.use('/api', apiRouter)

// 错误处理
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	console.error('[GLOBAL_ERROR]: ', err)
	errorResponse(res)
})

app.listen(port, () => {
	console.log(`Server is listening on http://127.0.0.1:${port}`)
})
