import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getPost} from "../store/features/postSlice";
import {getCommentsByPostId} from "../store/features/commentSlice";
import CreateComment from "../components/comment/CreateComment";
import Comment from "../components/comment/Comment";
import PostText from "../components/Text";


const PostItem = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {id} = useParams();
    const postId = id;


    useEffect(() => {
        handleGetPost(postId)
        handleGetComments(postId)
    }, [])


    const [post, setPost] = useState({})

    const [comments, setComments] = useState([])

    async function handleGetPost(postId) {
        const response = await dispatch(getPost(postId))
        setPost(response.payload)
    }

    async function handleGetComments() {
        const response = await dispatch(getCommentsByPostId(postId))
        console.log()
        if (response.payload?.status===200){
            setComments(response.payload.data)
        }
    }


    if (!post) {
        return <h1>Some Error</h1>
    }

    return (
        <div className='post'>
            <div className="wrapper">
                <div className="post_block">

                    <div className="postItem">
                        <h1 className='post-Title title'>{post.title}</h1>
                        <div className='postInfo flex between'>
                            <h2 className='subTitle'>Author: {post.author?.name}</h2>
                            <h2 className='subTitle'>Date: {post.date?.slice(0, 10)}</h2>
                        </div>
                        {post.img&&
                            <img src={'http://localhost:5000/uploads/'+post.img} alt={post.image}/>
                        }
                        <PostText
                            text={post.text}
                        />
                    </div>


                    <div className="post_comments">
                        {comments && comments.map((comment) =>
                            <Comment
                                handleGetComments={handleGetComments}
                                key={comment.id}
                                comment={comment}
                                user={user}
                            />
                        )
                        }
                    </div>


                    {user.name&&
                        <CreateComment
                            postId={id}
                            refreshComments={()=>handleGetComments()}
                        />
                    }

                </div>
            </div>
        </div>
    );
};

export default PostItem;