import mongoose from "mongoose";


const CommentModel = new mongoose.Schema({
    text:{type:String, require:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    post:{type:mongoose.Schema.Types.ObjectId, red:'Post'}
}, {timestamps:true})

export default mongoose.model('Comment', CommentModel)