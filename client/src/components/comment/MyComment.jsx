import React, {useState} from 'react';
import { AiFillDelete } from 'react-icons/ai';
import {Link} from "react-router-dom";
import {deleteComment} from "../../store/features/commentSlice";
import {useDispatch} from "react-redux";
import EditCommentBlock from "./EditCommentBlock";
import {MdModeEdit} from "react-icons/md";


const MyComment = ({comment, handleGetMyComments}) => {

    const dispatch = useDispatch()

    const [editBlock, setEditBlock] = useState(false)

    const openEditCommentBlock = function () {
        setEditBlock(true)
    }

    const closeEditCommentBlock = function () {
        setEditBlock(false)
    }
    const handleDeleteMyComment = async function () {
            const response = await dispatch(deleteComment(comment.id))
            if (response.payload===200){
                handleGetMyComments()
            }
    }

    return (
        <div className='comment_item'>
            <h2 className='subtitle'>{comment.text}</h2>

            <Link to={`/posts/${comment.postId}`}>{comment.postTitle}</Link>

            <div className="comment_itemEDit">
                <AiFillDelete
                    className='delete'
                    onClick={handleDeleteMyComment}
                />
                <MdModeEdit
                    className='edit'
                    onClick={() => openEditCommentBlock()}
                />
            </div>


            {editBlock&&
                <EditCommentBlock
                    handleGetComments={handleGetMyComments}
                    comment={comment}
                    closeEditCommentBlock={closeEditCommentBlock}
                />
            }
        </div>
    );
};

export default MyComment;