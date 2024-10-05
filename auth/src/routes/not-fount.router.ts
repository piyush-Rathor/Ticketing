import { Request, Response, Router } from "express";

const notFoundRouter = Router();


notFoundRouter.use('/', (req: Request, res: Response) => {
    return res.pageNotFound()
})

export default notFoundRouter