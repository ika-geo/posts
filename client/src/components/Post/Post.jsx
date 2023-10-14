import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import PostText from "../Text";
import PostItemViews from "../PostItemViews";


const PostItem = ({post}) => {

    const User = useSelector(state=>state.user)

    return (
        <div className='postItem'>
            <h1 className='postItem_title'><Link to={`/posts/${post.id}`}>{post.title}</Link></h1>
            <div className='hideAfter6'>
                <PostText
                    text={post.text}
                />
            </div>


            <div className="postItem_info flex between">
                <p>Author: <b>{User.id===post.author.id?`${post.author.name} (your post)`:post.author.name}</b></p>

                <PostItemViews
                    views={post.views}
                />
            </div>



        </div>
    );
};

export default PostItem;