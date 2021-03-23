import express from 'express';
import { createProduct, deleteProduct, getListProduct, getOneProduct, productById, updateProduct } from '../controllers/product';

const routerProduct = express.Router();

routerProduct.param('productId', productById);

routerProduct.get('/products', getListProduct);

routerProduct.get('/product/:productId',getOneProduct);

routerProduct.post('/product', createProduct);

routerProduct.delete('/product/:productId', deleteProduct);

routerProduct.put('/product/:productId', updateProduct);


module.exports = routerProduct;
