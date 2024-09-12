import express from "express";
import { Theme } from "../enums/Theme";

export const setThemeMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const themeFromQuery = req.query.theme;
    if (themeFromQuery && Object.values(Theme).includes(themeFromQuery as Theme)) {
      req.session.theme = themeFromQuery as Theme;
    }

    res.locals.theme = req.session.theme;
    next();
}