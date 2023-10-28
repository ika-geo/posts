import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import CommentModel from "../models/CommentModel.js";

import {createPostIssues} from "../features/createPostIssues.js";
import {getPostsAndResponse} from "../features/getPostsAndResponse.js";

import {postDto} from "../dtos/postDto.js";
import {postByIdDto} from "../dtos/postByIdDto.js";
import {deleteImg, uploadImg} from "../features/multer.js";


const postController = {
    getAllPosts: async function (req, res) {
        try {
            const posts = await PostModel.find({})

            const getAllPostsResponse = []

            for (let i = 0; i < posts.length; i++) {
                const author = await UserModel.findById(posts[i].author)
                const postItem = await postDto(posts[i], author)
                getAllPostsResponse.push(postItem)
            }
            res.json(getAllPostsResponse.reverse())
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'can\'t get posts, please try again'})
        }
    },

    getPostById: async function (req, res) {
        try {
            const postId = req.params.id
            const post = await PostModel.findById(postId)
            const postAuthor = await UserModel.findById(post.author)
            const author = {name: postAuthor.name, id: postAuthor._id}
            const getPostByIdResponse = postByIdDto(post, author)
            res.json(getPostByIdResponse)
            await PostModel.findByIdAndUpdate(post._id, { $inc: { views: 1 }})

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Can\'t get post, please try again later'})
        }
    },

    getMyPosts: async function (req, res) {
        try {
            const author = await UserModel.findById(req.userId)
            await getPostsAndResponse(res, author)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Can\'t get posts, please try again later'})
        }
    },
    createPost: async function (req, res) {
        try {
            const issue = createPostIssues(req, res)
            if (issue) {
                return
            }
            const {title, text} = req.body

            let img

            if (req.file){
                img = await uploadImg(req.file)
            }

            const author = req.userId
            const postResponse = {title, text, author, views:0, img: img?img:undefined}
            const post = await new PostModel(postResponse)
            await post.save()
            await UserModel.findByIdAndUpdate(author, {$addToSet: {posts: post._id}})
            res.status(200).json({id:post._id, message:'Post is created'})
        } catch (e) {
            res.status(500).json({message: 'Some error during create post, please try again'})
            console.log(e)
        }
    },

    editPost: async function (req, res) {
        try {
            const postId = req.params.id
            const post = await PostModel.findById(postId)

            //check, if this post belongs to author
            if (post.author.toString() !== req.userId) {
                return res.json({message: 'you haven\'t permission to change this post'})
            }

            //check if title is send for change
            if (req.body.title) {
                post.title = req.body.title
            }

            //check if text is send for change
            if (req.body.text) {
                post.text = req.body.text
            }
            await post.save()
            res.status(200).json({message: 'post is changed'})

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Some error during editing post, please try again'})
        }

    },

    deletePost: async function (req, res) {
        try {
            const postId = req.params.id
            const post = await PostModel.findById(postId)


            //check, if this post belongs to author
            if (post.author.toString() !== req.userId) {
                return res.status(403).json({message: 'Have not permission to delete this post'})
            }

            //delete post comments, and in user array
            for (let i=0; i<post.comments.length; i++){
                const comment = await CommentModel.findById(post.comments[i])
                await UserModel.findByIdAndUpdate(comment.author, {$pull: {comments: comment._id}})
                await CommentModel.findByIdAndDelete(post.comments[i])
            }

            //delete from user.posts array
            await UserModel.findByIdAndUpdate(req.userId, {$pull: {posts: postId}})

            //delete image
            if (post?.img.key){
                await deleteImg((post.img.key))
            }

            //delete post
            await PostModel.findByIdAndDelete(postId)

            res.status(200).json({message: 'Post is successfully deleted'})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Some error during deleting post, please try again'})
        }
    }
}


export default postController