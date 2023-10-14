import React from 'react';
import {AiOutlineEye} from "react-icons/ai";
import '../assets/style/components/postItemViews.css'


const PostItemViews = ({views}) => {
    return (
        <div className="postItem_views">
            <AiOutlineEye className='postItem_viewsIcon'/><p>{views}</p>
        </div>
    );
};

export default PostItemViews;