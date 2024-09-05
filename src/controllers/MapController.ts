import express from "express";

export const getMapPage = (req: express.Request, res: express.Response) => {
    res.render('map.html', { token: req.session.token});
}

export const getNJKMapPage = (req: express.Request, res: express.Response) => {
    res.render('map.njk', { token: req.session.token});
}