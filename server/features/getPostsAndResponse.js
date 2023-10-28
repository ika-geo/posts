import {postDto} from "../dtos/postDto.js";
import PostModel from "../models/PostModel.js";

export const getPostsAndResponse = async function (res, author) {
    const responsePosts = []
    for (let i=0; i<author.posts.length; i++){
        const postItem = await PostModel.findById(author.posts[i])
        responsePosts.push(await postDto(postItem, author))
    }
    res.json(responsePosts.reverse())
}