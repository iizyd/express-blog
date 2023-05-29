import { Request, Response } from "express";

export default class ArticleController {
    public async getAllArticles(req: Request, res: Response) {
        res.send('article')
    }
}