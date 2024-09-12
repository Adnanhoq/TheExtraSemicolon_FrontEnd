import express from "express";
import { getProfilePicture, updateProfilePicture } from "../services/ProfileService";
import { jwtDecode } from "jwt-decode";
import { ProfileResponse } from "../models/ProfileResponse";
import { ProfileRequest } from "../models/ProfileRequest";

export const getCameraPage = (req: express.Request, res: express.Response) => {
    res.render('profilePicture.njk', { token: req.session.token, profile: req.session.profilePicture});
}

export const getProfilePage = (req: express.Request, res: express.Response) => {

    const decodedToken = jwtDecode(req.session.token ?? '');
    res.render('profile.njk', { token: req.session.token, email: decodedToken.sub, profile: req.session.profilePicture});
}

export const putProfilePicture = async (req: express.Request, res: express.Response) => {
    
    try {
        await updateProfilePicture(req.body as ProfileRequest, req.session.token ?? '');
        const profileUpdate: ProfileResponse = await getProfilePicture(req.session.token ?? '');
    
        if (profileUpdate.profilePicture) {
            const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
            while (scriptRegex.test(profileUpdate.profilePicture)) {
                profileUpdate.profilePicture = profileUpdate.profilePicture.replace(scriptRegex, "");
            }
            req.session.profilePicture = profileUpdate.profilePicture;
        }
        res.redirect('/profile');
    } catch (e) {
        res.locals.errormessage = "Something went wrong when updating your profile";
        res.render('profilePicture.njk', {token: req.session.token, profile: req.session.profilePicture})
    }

}