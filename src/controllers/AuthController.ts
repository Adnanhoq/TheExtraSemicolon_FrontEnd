import express from "express";
import { getToken } from "../services/AuthService";
import { LoginRequest } from "../models/LoginRequest";
import { AxiosResponse } from "axios";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm.njk', { token: req.session.token});
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getToken(req.body);
        res.redirect('/');
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('loginForm.njk', req.body);
    }
}

export const getLogout = async (req: express.Request, res: express.Response): Promise<void> => {
    if(req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send("Unable to log out")
            } else {
                res.redirect('/login');
            }
        });
    }
    
} 
