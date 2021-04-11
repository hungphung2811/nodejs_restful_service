import express from 'express';
import { createProduct, deleteProduct, getListProduct, getOneProduct, productById, updateProduct } from '../app/controllers/product.controller';

const routerBlog = express.Router();

routerBlog.param('blogId', productById);

routerBlog.get('/', getListProduct);

routerBlog.get('/:blogId', getOneProduct);

routerBlog.post('/', createProduct);

routerBlog.delete('/:blogId', deleteProduct);

routerBlog.put('/:blogId', updateProduct);

module.exports = routerBlog;
