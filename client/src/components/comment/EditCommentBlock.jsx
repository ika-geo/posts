import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {IoCloseSharp} from 'react-icons/io5'
import {editComment} from "../../store/features/commentSlice";



const EditCommentBlock = ({comment, closeEditCommentBlock, handleGetComments}) => {

    useEffect(()=>{
        setText(comment.text)
    }, [])


    const dispatch = useDispatch()


    const [commentText, setText] = useState('')

    const handleChangeComment = async function (e) {
        e.preventDefault()
        const response = await dispatch(editComment({text:commentText, id:comment.id}))
        if (response.payload===200){
            closeEditCommentBlock()
            handleGetComments()
        }
    }


    return (
        <div className='editBlock'>
            <div className="formBlock">
                <h1 className='title'>Edit Comment</h1>
                <IoCloseSharp
                    className='close'
                    onClick={closeEditCommentBlock}
                />
                <form>
                    <textarea
                        onChange={e=>setText(e.target.value)}
                        value={commentText}></textarea>
                    <button
                        onClick={e=>handleChangeComment(e)}
                        className='fullBtn'>Send</button>
                </form>
            </div>
        </div>
    );
};

export default EditCommentBlock;