import express from 'express';
import { createCategory, deleteCategory, getListCategory, getOneCategory, categoryById, updateCategory } from '../app/controllers/category.controller';

const routerCategory = express.Router();

routerCategory.param('categoryId', categoryById);

routerCategory.get('/', getListCategory);

routerCategory.get('/:categoryId', getOneCategory);

routerCategory.post('/', createCategory);

routerCategory.delete('/:categoryId', deleteCategory);

routerCategory.put('/:categoryId', updateCategory);

module.exports = routerCategory;
