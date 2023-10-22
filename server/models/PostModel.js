import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
    title: {type: String, require: true},
    text: {type: String, require: true},
    img: {
        src:{type:String},
        key:{type:String}
    },
    views: {type: Number, require: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
}, {timestamps: true})

export default mongoose.model('Post', PostModel)