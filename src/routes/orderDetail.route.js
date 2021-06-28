import express from 'express';
import { isAuth, requireSignin } from '../app/controllers/auth.controller';
import {
    createOrder,
    getAllOrders,
    getOneOrder,
    orderDetailId
} from '../app/controllers/orderDetail.controller';

const routerOrderDetail = express.Router();
routerOrderDetail.param('orderDetailId', orderDetailId);
routerOrderDetail.get('/', getAllOrders);
routerOrderDetail.get('/:orderDetailId', getOneOrder);
routerOrderDetail.post('/:userId', requireSignin, isAuth, createOrder);

module.exports = routerOrderDetail;