import React, {useState} from 'react';
import {AiFillDelete} from "react-icons/ai";
import {MdModeEdit} from "react-icons/md";
import {deleteComment} from "../../store/features/commentSlice";
import {useDispatch} from "react-redux";
import EditCommentBlock from "./EditCommentBlock";



const Comment = ({comment, user, handleGetComments}) => {

    const dispatch = useDispatch()

    const [editBlock, setEditBlock] = useState(false)

    async function handleDeleteComment(){
        const response = await dispatch(deleteComment(comment.id))
        if (response.payload===200){
            handleGetComments(comment.postId)
        }
    }

    const openEditCommentBlock = function () {
        setEditBlock(true)
    }

    const closeEditCommentBlock = function () {
        setEditBlock(false)
    }


    return (
        <div className='commentItem'>
            <p className='comment_author'>{comment.author.name}</p>
            <p className='comment_text'>{comment.text}</p>
            {user.id===comment.author.id&&
                <>
                    <AiFillDelete
                        className='comment_delete'
                        onClick={() => handleDeleteComment()}
                    />
                    <MdModeEdit
                        className='comment_edit'
                        onClick={() => openEditCommentBlock()}
                    />
                </>
            }
            {editBlock&&
                <EditCommentBlock
                    handleGetComments={handleGetComments}
                    comment={comment}
                    closeEditCommentBlock={closeEditCommentBlock}
                />
            }
        </div>
    );
};

export default Comment;