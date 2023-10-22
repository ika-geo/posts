import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config()

const {S3} = AWS

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
    const s3 = new S3()
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



//delete img
export const deleteImg = async (imgKey)=>{
    const s3 = new S3();
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imgKey
    };
    s3.deleteObject(params, (err) => {
        if (err) {
            console.error(err);
        }
    });
}


