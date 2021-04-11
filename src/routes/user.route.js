import express from 'express';
import { requireSignin, isAuth, userById, isAdmin, readUser, updateUser } from '../app/controllers/user.controller';

const routerUser = express.Router();

routerUser.param('userId', userById);

routerUser.get('/check/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

routerUser.get('/:userId', requireSignin, isAuth, readUser);
routerUser.put('/:userId', requireSignin, isAuth, updateUser);

module.exports = routerUser;
