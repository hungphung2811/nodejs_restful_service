import express from 'express';
import { createProduct, deleteProduct, getListProduct, getOneProduct, productById, updateProduct } from '../app/controllers/product.controller';

const routerProduct = express.Router();

routerProduct.param('productId', productById);

routerProduct.get('/', getListProduct);

routerProduct.get('/:productId',getOneProduct);

routerProduct.post('/', createProduct);

routerProduct.delete('/:productId', deleteProduct);

routerProduct.put('/:productId', updateProduct);

module.exports = routerProduct;
