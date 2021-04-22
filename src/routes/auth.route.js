import express from 'express'
import { signup,checkEmail, signin, signout, userById,requireSignin,isToken,isAuth,isAdmin } from '../app/controllers/auth.controller';
import { userSignupValidator } from '../app/validator';

const routerAuth = express.Router();

routerAuth.param('userId', userById);

routerAuth.get('/check', isToken, requireSignin, isAuth, (req, res) => {
    res.json({
        user: req.userLogined,
        message:"you are logged in"
    })
});

routerAuth.get('/checkAdmin/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    res.json(req.profile)
});

routerAuth.post('/signup', userSignupValidator, checkEmail, signup);
routerAuth.post('/signin', signin);
routerAuth.post('/signout', signout);

module.exports = routerAuth;
