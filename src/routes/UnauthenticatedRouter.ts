import express from 'express';
import { getIndexPage, getMapPage } from '../controllers/HomeController';
import { getLoginForm, postLoginForm, getLogout } from '../controllers/AuthController';
import { getAllDatabases } from '../controllers/TestController';

export const unauthenticatedRouter = express.Router();

unauthenticatedRouter.get('/', getIndexPage);
unauthenticatedRouter.get('/login', getLoginForm);
/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
unauthenticatedRouter.post('/login', postLoginForm);
unauthenticatedRouter.get('/logout', getLogout);
/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
unauthenticatedRouter.get('/test', getAllDatabases);
unauthenticatedRouter.get('/map', getMapPage);
