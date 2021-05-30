import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOneOrder,
    orderId
} from '../app/controllers/order.controller';

const routerOrder = express.Router();
routerOrder.param('orderId',orderId);
routerOrder.get('/', getAllOrders);
routerOrder.get('/:orderId', getOneOrder);
routerOrder.post('/', createOrder);

module.exports = routerOrder;