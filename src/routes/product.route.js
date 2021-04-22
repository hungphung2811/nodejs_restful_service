import express from 'express';
import { createProduct, deleteProduct, getListProduct, getOneProduct, listProducts, productById, updateProduct } from '../app/controllers/product.controller';
import { requireSignin,isAuth,isAdmin} from "../app/controllers/auth.controller";
import { userById } from '../app/controllers/user.controller';
const routerProduct = express.Router();

routerProduct.param('productId', productById);
routerProduct.param('userId', userById);

routerProduct.get('/', getListProduct);

routerProduct.get('/:productId',getOneProduct);

routerProduct.post('/:userId', requireSignin, isAuth, isAdmin, createProduct);

routerProduct.delete('/:productId/:userId', requireSignin, isAuth, isAdmin, deleteProduct);

routerProduct.put('/:productId/:userId', requireSignin, isAuth, isAdmin, updateProduct);

module.exports = routerProduct;
