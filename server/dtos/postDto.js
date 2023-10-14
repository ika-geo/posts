
export const postDto = async(post, author)=>{
    return {
        id:post._id,
        title:post.title,
        text:post.text,
        author:{
            id:author._id,
            name:author.name,
        },
        commentsCount:post.comments.length,
        views:post.views,
        date:post.createdAt,
    }
}