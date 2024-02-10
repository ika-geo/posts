import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import multer from 'multer'
import ImagesForDelete from "../models/ImageForDelete.js";


dotenv.config()

//multer options
const storage = multer.memoryStorage()
const fileFilter = function (req, file, cb) {
    //check if file is image or not
    if (file.mimetype.split('/')[0] === 'image') {
        cb(null, true)
    } else {
        cb(new Error('file is not of the correct type'))
    }
}
export const uploadImgMulter = multer({storage, fileFilter}).single('img')










//upload image
export const uploadImg = async function (file) {
    try{
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `upload/${Date.now()}-${file.originalname}`,
            Body: file.buffer
        }
        const result = await s3.upload(params).promise()
        return {
            src:result.Location,
            key:result.Key
        }
    }
    catch (e) {
        console.log(e)
    }
}

//delete img
export const deleteImg = async function (imgKey){
    try{
        //save which img need to be deleted
        let imageForDelete = await new ImagesForDelete({image:imgKey})
        await imageForDelete.save()

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imgKey
        };

        const result = await s3.deleteObject(params).promise();
        console.log("File has been deleted successfully");
        console.log(result);
    }
    catch (e) {
        console.log(e)
    }
}

