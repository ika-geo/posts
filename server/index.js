import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'


//middleware
const app = express()
app.use(express.json())
dotenv.config()
app.use(cors(
    {
        origin: 'https://posts-client-navy.vercel.app/',
        methods: 'GET,PUT,POST,DELETE',
        exposedHeaders: ['Authorization', 'Refreshtoken'],
        credentials: true
    }
));
app.use(cookieParser())
app.use('/uploads',express.static('uploads'))
app.use(fileUpload())


//routes
import AuthRoute from "./routes/authRoute.js";

app.use('/api/auth', AuthRoute)
import PostRoute from "./routes/postsRoute.js";

app.use('/api/posts', PostRoute)
import CommentsRoute from "./routes/commentsRoute.js";

app.use('/api/comments', CommentsRoute)

app.get('/', function (req, res){
    res.json('server is running')
    console.log('pass is '+ process.env.MONGO_PASS)
})


const mongoDBUrl = `mongodb+srv://ikagelescorp:${process.env.MONGO_PASS}@mernblog.1v7q8do.mongodb.net/?retryWrites=true&w=majority`
const port = process.env.PORT || 3002

//routes
app.get

// Connect to MongoDB using Mongoose and start server
async function start() {
    try {
        app.listen(port, function () {
            console.log(`Server started on port ${port}`)
        })
        await mongoose.connect(mongoDBUrl, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

start().catch(e => console.log(e))