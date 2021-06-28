import OrderDetailModel from "../models/orderDetail.model";

export const orderDetailId = (req, res, next, id) => {
    OrderDetailModel.findById(id).exec((err, orderDetail) => {
        if (err || !orderDetail) {
            return res.status(400).json({
                error: "khong tim thay order"
            });
        }
        req.orderDetail = orderDetail;
        next();
    });
};

export const getAllOrders = (req, res) => {
    OrderDetailModel.find((err, data) => {
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
    const orderDetail = new OrderDetailModel(req.body);
    orderDetail.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'khong order'
            })
        }
        res.json(data);
    })
}