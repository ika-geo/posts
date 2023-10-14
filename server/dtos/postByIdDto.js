export const postByIdDto = function (post, author) {
    return {
        id:post.id,
        title:post.title,
        text:post.text,
        author,
        date:post.createdAt,
        img:post.img
    }
}