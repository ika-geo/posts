import {Router} from "express";
import authController from "../controllers/authController.js";
import CommentController from "../controllers/commentController.js";
import postController from "../controllers/postController.js";
import PostRoute from "./postsRoute.js";


const CommentRoute = new Router()

CommentRoute.get('/myComments', authController.checkMe, CommentController.getMyComments)
CommentRoute.get('/:id', CommentController.getCommentsByPost)
CommentRoute.post('/', authController.checkMe, CommentController.createComment)
CommentRoute.put('/:id', authController.checkMe, CommentController.editComment)
CommentRoute.delete('/:id', authController.checkMe,CommentController.deleteComment)

export default CommentRoute