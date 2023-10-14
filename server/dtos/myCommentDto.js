
export const myCommentDto = function (comment, post) {
    return {
        id: comment._id.toString(),
        text: comment.text,
        postId: post._id.toString(),
        postTitle: post.title
    }
}