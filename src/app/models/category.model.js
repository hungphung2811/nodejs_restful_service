import mongoose from 'mongoose';

// const ObjectId = Schema.ObjectId;

const categorySchema = new mongoose.Schema({
    // id: ObjectId,
    cateName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    },
    image: {
        type: String
    },
    short_desc: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000
    }
}, {
    timestamps: true,
    collection: 'categories'
})

module.exports = mongoose.model('Category', categorySchema);
