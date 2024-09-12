import express from "express";

export const getIndexPage = (req: express.Request, res: express.Response) => {
    res.render('index.njk', { token: req.session.token, profile: req.session.profilePicture});
}
