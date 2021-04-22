import express from 'express';
import { createCategory, deleteCategory, getListCategory, getOneCategory, categoryById, updateCategory } from '../app/controllers/category.controller';
import { requireSignin, isAuth, isAdmin } from "../app/controllers/auth.controller";
import { userById } from '../app/controllers/user.controller';

const routerCategory = express.Router();
routerCategory.param('userId', userById);
routerCategory.param('categoryId', categoryById);

routerCategory.get('/', getListCategory);

routerCategory.get('/:categoryId', getOneCategory);

routerCategory.post('/:userId', requireSignin, isAuth, isAdmin, createCategory);

routerCategory.delete('/:categoryId/:userId', requireSignin, isAuth, isAdmin, deleteCategory);

routerCategory.put('/:categoryId/:userId', requireSignin, isAuth, isAdmin, updateCategory);

module.exports = routerCategory;
