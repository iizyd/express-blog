import express, { Application, NextFunction, Request, Response } from 'express'
import articleRouter from './routes/article.route'

const app: Application = express();
const port = 9000

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello')
})

app.use('/article', articleRouter)

app.listen(port, () => {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
})