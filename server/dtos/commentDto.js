export const commentDto = function (commentItem, post, author) {
    return {
        id:commentItem._id,
        text: commentItem.text,
        postId: post._id,
        postTitle: post.title,
        author:{
            id:author._id,
            name:author.name
        }
    }
}