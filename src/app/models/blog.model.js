import mongoose from 'mongoose';

// const ObjectId = Schema.ObjectId;

const blogSchema = new mongoose.Schema({
    // id: ObjectId,
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000
    }
}, {
    timestamps: true,
    collection: 'blog'
})

module.exports = mongoose.model('Blog', blogSchema);
