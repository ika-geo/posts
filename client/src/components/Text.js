import DOMPurify from 'dompurify'
import React from "react";


const PostText = ({text}) => {
    return (
        <p className='postItem_text' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(text)}}></p>
    );
};

export default PostText;