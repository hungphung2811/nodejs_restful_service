import mongoose from 'mongoose';

// const ObjectId = Schema.ObjectId;

const productSchema = new mongoose.Schema({
    // id: ObjectId,
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    image:{
        type: String,
        required: true,
        maxLength: 100
    },
    price:{
        type:Number,
        required: true,
        trim: true,
        maxLength:32
    },
    quantity:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    shipping:{
        required: true,
        type:Boolean
    },
    description: {
        type: String,
        required: true,
        maxLength:2000
    }
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema);
