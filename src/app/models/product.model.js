import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    image: {
        type: String,
        trim: true,
        require: true
    },
    price: {
        type: Number,
        trim: true,
        require: true,
        maxlength: 32
    },
    sale: {
        type: Number,
        trim: true,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    }, quantity: {
        type: Number,
        trim: true,
        require:true
    },
    instock: {
        type: Number,
        trim: true,
        require:true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 2000,
        require:true
    },
    view: {
        type: Number,
        trim: true,
        default: 0
    },
    categoryId: {
        type: ObjectId,
        ref: 'Category',
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);
