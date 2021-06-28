import express from 'express';
import { isAuth, requireSignin } from '../app/controllers/auth.controller';
import {
    createOrder,
    getAllOrders,
    getOneOrder,
    orderId
} from '../app/controllers/order.controller';

const routerOrder = express.Router();
routerOrder.param('orderId', orderId);
routerOrder.get('/', getAllOrders);
routerOrder.get('/:orderId', getOneOrder);
routerOrder.post('/:userId', requireSignin, isAuth, createOrder);

module.exports = routerOrder;