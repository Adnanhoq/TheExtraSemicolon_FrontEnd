import express from "express";

export const getIndexPage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('index.njk', { token: req.session.token});
}