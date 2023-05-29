import express, { Application, NextFunction, Request, Response } from 'express'
import apiRouter from './routes/router'

const app: Application = express()
const port = 9000

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('hello')
})

app.use('/api', apiRouter)

app.listen(port, () => {
	console.log(`Server is listening on http://127.0.0.1:${port}`)
})
