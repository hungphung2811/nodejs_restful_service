import express from 'express';
import { isAuth, isToken, requireSignin } from '../app/controllers/auth.controller';
import { getAllUsers, getOne, readUser, updateUser, userById } from '../app/controllers/user.controller';

const routerUser = express.Router();

routerUser.param('userId', userById);
routerUser.get('/', getAllUsers);
routerUser.get('/getone/:userId', getOne);
routerUser.get('/:userId', isToken, requireSignin, isAuth, readUser);
routerUser.put('/:userId', isToken, requireSignin, isAuth, updateUser);

module.exports = routerUser;
