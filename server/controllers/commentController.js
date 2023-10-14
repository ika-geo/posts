import CommentModel from "../models/CommentModel.js";
import UserModel from "../models/UserModel.js";
import PostModel from "../models/PostModel.js";
import {commentDto} from "../dtos/commentDto.js";
import {myCommentDto} from "../dtos/myCommentDto.js";

const CommentController = {


    getCommentsByPost:async function (req, res){
        try{
            const postId = req.params.id
            const post  = await PostModel.findById(postId)
            const getCommentsByPostResponse = []
            for (let i=0; i<post.comments.length; i++){
                const commentItem = await CommentModel.findById(post.comments[i])
                const author = await UserModel.findById(commentItem.author)
                getCommentsByPostResponse.push(commentDto(commentItem, post, author))
            }
            res.json(getCommentsByPostResponse)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'can\'t get comments fot this post, please try again'})
        }
    },

    getMyComments:async function (req, res) {
        try{
            const user = await UserModel.findById(req.userId)
            const getMyCommentsResponse = []
            for (let i=0; i<user.comments.length; i++){
                const comment = await CommentModel.findById(user.comments[i])
                const post = await PostModel.findById(comment.post)
                getMyCommentsResponse.push(myCommentDto(comment, post))
            }
            res.status(200).json(getMyCommentsResponse)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Some error in getting comments, please try again'})
        }

    },

    createComment:async function (req, res) {
        try{
            const text = req.body.text
            const postId=req.body.postId

            const comment = await new CommentModel({
                text:text,
                author:req.userId,
                post:postId
            })
            await comment.save()
            await PostModel.findByIdAndUpdate(postId, {$push:{comments: comment._id}})
            await UserModel.findByIdAndUpdate(req.userId, {$push:{comments: comment._id}})

            res.status(200).json({message:'Comment is created'})
        }
        catch(e){
            console.log(e)
            res.status(500).json({message: 'Some error in creating comment, please try again'})
        }
    },

    editComment:async function (req, res) {
        try{
            const commentId = req.params.id
            const text = req.body.text

            const comment = await CommentModel.findById(commentId)

            if (req.userId!==comment.author.toString()){
                return res.json({message:'have no permission to change this comment'})
            }
            comment.text=text
            await comment.save()
            res.status(200).json({message:'Comment is changed'})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Some error in editing comment, please try again'})
        }
    },


    deleteComment:async function (req, res) {
        try{
            const commentId = req.params.id

            const comment = await CommentModel.findById(commentId)
            const postId = comment.post.toString()

            if (req.userId!==comment.author.toString()){
                 return res.json({message:'have no permission to delete this comment'})
             }

            await CommentModel.findOneAndDelete({_id:commentId})

            await UserModel.findByIdAndUpdate(req.userId,
                { $pull: { comments: { $in: [commentId] } } }
            );
            await PostModel.findByIdAndUpdate(postId,
                { $pull: { comments: { $in: [commentId] } } }
            );

             res.status(200).json({message:'Comment is deleted'})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Some error in deleting comment, please try again'})
        }
    }

}

export default CommentController