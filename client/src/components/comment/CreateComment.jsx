import React, {useState} from 'react';
import {createComment} from "../../store/features/commentSlice";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";


const CreateComment = ({postId, refreshComments}) => {

    const [text, setComment] = useState('')

    const dispatch = useDispatch()

    const handleCreateComment = async (e)=>{
        e.preventDefault()
        if (text){
            const response = await dispatch(createComment({ text, postId }));
            if (response?.payload===200){
                setComment('')
                refreshComments()
            }
        }
        else{
            toast.info('Enter text')
        }
    }

    return (
        <>
                <form action="">
                    <label htmlFor="comment">Type text</label>
                    <textarea
                        value={text}
                        onChange={e=>setComment(e.target.value)}
                        id="comment"></textarea>
                    <button
                        onClick={(e)=>handleCreateComment(e)}
                        className='fullBtn'>Comment</button>
                </form>
        </>
    );
};

export default CreateComment;