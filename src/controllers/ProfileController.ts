import express from "express";
import { updateProfilePicture } from "../services/ProfileService";
import { JwtToken } from "../models/JwtToken";
import { jwtDecode } from "jwt-decode";

export const getCameraPage = (req: express.Request, res: express.Response) => {
    res.render('profile.njk', { token: req.session.token});
}

export const putProfilePicture = async (req: express.Request, res: express.Response) => {
    
    await updateProfilePicture(req.body, req.session.token ?? '');
}