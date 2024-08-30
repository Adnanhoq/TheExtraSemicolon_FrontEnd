import express, { RequestHandler } from 'express';
import { getIndexPage } from '../controllers/HomeController';
import { getLoginForm, postLoginForm, getLogout } from '../controllers/AuthController';
import { getAllDatabases } from '../controllers/TestController';

export const unauthenticatedRouter = express.Router();

unauthenticatedRouter.get('/', getIndexPage);
unauthenticatedRouter.get('/login', getLoginForm);
unauthenticatedRouter.post('/login', (postLoginForm as RequestHandler));
unauthenticatedRouter.get('/logout', getLogout);
unauthenticatedRouter.get('/test', (getAllDatabases as RequestHandler));
