import mongoose from 'mongoose';

// const ObjectId = Schema.ObjectId;

const categorySchema = new mongoose.Schema({
    // id: ObjectId,
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000
    }
}, {
    timestamps: true,
    collection: 'category'
})

module.exports = mongoose.model('Category', categorySchema);
