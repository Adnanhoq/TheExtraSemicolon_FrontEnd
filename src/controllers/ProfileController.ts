import express from "express";

export const getCameraPage = (req: express.Request, res: express.Response) => {
    res.render('profile.njk', { token: req.session.token});
}

export const postProfilePicture = async (req: express.Request, res: express.Response) => {
    
}