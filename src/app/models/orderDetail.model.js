import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const orderDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32
    },
    price: {
        type: Number,
        trim: true,
        length: 10,
    },
    amount: {
        type: Number,
        trim: true,
    },
    oderId: {
        type: ObjectId,
        ref: 'Order',
        require: false
    }
}, {
    timestamps: true,
    collection: 'orders_detail'
})

module.exports = mongoose.model('OrderDetail', orderDetailSchema);