import express from "express";
import { getProfilePicture, updateProfilePicture } from "../services/ProfileService";
import { JwtToken } from "../models/JwtToken";
import { jwtDecode } from "jwt-decode";
import { ProfileResponse } from "../models/ProfileResponse";

export const getCameraPage = (req: express.Request, res: express.Response) => {
    res.render('profile.njk', { token: req.session.token, profile: req.session.profilePicture});
}

export const putProfilePicture = async (req: express.Request, res: express.Response) => {
    
    await updateProfilePicture(req.body, req.session.token ?? '');
    const profileUpdate: ProfileResponse = await getProfilePicture(req.session.token ?? '');

    if (profileUpdate.profilePicture) {
        //req.session.profilePicture = profileUpdate.profilePicture;
    }

}