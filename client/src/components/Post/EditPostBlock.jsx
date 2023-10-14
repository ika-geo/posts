import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {IoCloseSharp} from 'react-icons/io5'
import {editPost} from "../../store/features/postSlice";
import TextEditor from "../TextEditor";
import {toast} from "react-toastify";


const EditPostBlock = ({post, handleCloseEditPostBlock, handleGetMyPosts}) => {

    useEffect(() => {
        setPost({title: post.title, text: post.text})
    }, [])


    const dispatch = useDispatch()


    const [postData, setPost] = useState({title: '', text: ''})

    const handleChangeTitle = function (e) {
        setPost(prevState => ({...prevState, title: e.target.value}))
    }

    const handleChangeText = function (e) {
        setPost((prevState => ({...prevState, text: e})))
    }

    const handleChangePost = async function (e) {
        e.preventDefault()
        if (!postData.title&&!postData.text){
            return toast.info('Post is not changed')
        }
        const response = await dispatch(editPost({text:postData.text, title: postData.title, id:post.id}))
        if (response.payload===200){
            handleCloseEditPostBlock()
            handleGetMyPosts()
        }
    }


    return (
        <div className='editBlock'>
            <div className="formBlock">
                <h1 className='title'>Edit Post</h1>
                <IoCloseSharp
                    className='close'
                    onClick={handleCloseEditPostBlock}
                />
                <form>
                    <label htmlFor="title">title</label>

                    <input
                        value={postData.title}
                        onChange={e=>handleChangeTitle(e)}
                        type="text"/>

                    <label htmlFor="text">Text</label>


                    <TextEditor
                        id='text'
                        handleText={e=>handleChangeText(e)}
                        value={postData.text}
                    />

                    <button
                        onClick={e=>handleChangePost(e)}
                        className='fullBtn'>Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPostBlock;