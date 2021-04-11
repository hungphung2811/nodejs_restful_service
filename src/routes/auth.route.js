import express from 'express'
import { signup,signin, signout } from '../app/controllers/auth.controller';
import { userSignupValidator } from '../app/validator';

const routerAuth = express.Router();

routerAuth.post('/signup', userSignupValidator, signup);
routerAuth.post('/signin', signin);
routerAuth.post('/signout', signout);

module.exports = routerAuth;
