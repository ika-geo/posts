import {Router} from "express";
import postController from "../controllers/postController.js";
import authController from "../controllers/authController.js";

const PostRoute = new Router()

PostRoute.get('/', postController.getAllPosts)
PostRoute.get('/myPosts', authController.checkMe, postController.getMyPosts)
PostRoute.get('/:id', postController.getPostById)
PostRoute.post('/', authController.checkMe, postController.createPost)
PostRoute.put('/:id', authController.checkMe, postController.editPost)
PostRoute.delete('/:id', authController.checkMe, postController.deletePost)

export default PostRoute
