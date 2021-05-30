import OrderModel from "../models/order.model";

export const orderId = (req, res, next, id) => {
    OrderModel.findById(id).exec((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "khong tim thay order"
            });
        }
        req.order = order;
        next();
    });
};

export const getAllOrders = (req, res) => {
    OrderModel.find((err, data) => {
        if (err) return res.json({
            error: "khong tim thay order"
        });
        res.json(data);
    });
};

export const getOneOrder = (req, res) => {
    return res.json(req.order);
};

export const createOrder = (req, res) => {
    const order = new OrderModel(req.body);
    order.save((err, data)=>{
        if(err) {
            return res.status(500).json({
                error: 'khong order'
            })
        }
        res.json(data);
    })
}