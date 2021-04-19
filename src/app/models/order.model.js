import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32
    },
    phone: {
        type: String,
        trim: true,
        require: true,
        length: 10,
    },
    address: {
        type: String,
        require: true,
        trim: true,
        maxlength: 200
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        require: true
    }
}, {
    timestamps: true,
    collation: 'orders'
})

module.exports = mongoose.model('Order', orderSchema);