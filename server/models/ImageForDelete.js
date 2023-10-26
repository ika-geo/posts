import mongoose from "mongoose";


const ImagesForDelete = new mongoose.Schema({
    image: {type: String, require: true},
}, {timestamps: true})

export default mongoose.model('imagesForDelete', ImagesForDelete)