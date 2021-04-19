import OrderModule from '../models/order.model';


export const getAllOrders = (req, res) => {
    OrderModule.find((err,data)=>{
        if (err) return res.json({error:"khong tim thay order"});
        res.json(data)
    })
}