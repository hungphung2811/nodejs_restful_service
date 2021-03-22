import express from 'express';
import { createProduct, deleteProduct, getListProduct, updateProduct } from '../controllers/product';

const routerProduct = express.Router();

routerProduct.get('/products', getListProduct);

routerProduct.post('/products', createProduct);

routerProduct.delete('/products/:id', deleteProduct);

routerProduct.put('/products/:id', updateProduct);


module.exports = routerProduct;
