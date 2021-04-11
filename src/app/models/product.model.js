import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    // id: ObjectId,
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 32
    },
    sale:{
        type:Number,
        trim:true,
        default: 0
    },
    status:{
        type:Boolean,
        default: true
    },
    quantity: {
        type: Number,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    categoryId: {
        type: ObjectId,
        required: true,
        ref: 'Category'
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);
