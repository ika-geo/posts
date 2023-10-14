import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    name: {type: String, required: true, unique: false},
    email: {type: String, unique: true, required: true,},
    password: {type: String, required: true,},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
},
    {timestamps: true});

export default mongoose.model("User", UserModel);
