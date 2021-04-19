import express from 'express';
import { getAllOrders} from '../app/controllers/order.controller';

const routerOrder = express.Router();

routerOrder.get('/', getAllOrders)

module.exports = routerOrder;