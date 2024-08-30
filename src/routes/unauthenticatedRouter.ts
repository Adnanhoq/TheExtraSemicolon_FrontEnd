import express from 'express';
import { getIndexPage } from '../controllers/HomeController';
import { getLoginForm, postLoginForm, getLogout } from '../controllers/AuthController';
import { getAllDatabases } from '../controllers/TestController';

export const unauthenticatedRouter = express.Router();

unauthenticatedRouter.get('/', getIndexPage);
unauthenticatedRouter.get('/login', getLoginForm);
unauthenticatedRouter.post('/login', (req, res, next) => {
    postLoginForm(req, res).catch((err:unknown) => {
        next(err);
    });
});
unauthenticatedRouter.get('/logout', getLogout);
unauthenticatedRouter.get('/test', (req, res, next) => {
    getAllDatabases(req, res).catch((err:unknown) => {
        next(err);
    });
});
