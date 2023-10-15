import React, {useEffect, useState} from 'react';
import {createPost} from "../store/features/postSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import TextEditor from "../components/TextEditor";




const CreatePost = () => {




    const dispatch = useDispatch()

    const navigate = useNavigate()


    const [post, setPost] = useState({ title: "", text: "" , img:""})


    useEffect(()=>{
        console.log(post)
    }, [post])


    const handleTitle = function (e) {
        setPost(prevState => ({...prevState, title:e.target.value}))
    }
    const handleText = function (e) {
        setPost(prevState => ({...prevState, text:e}))
    }
    const handleImg = function (e) {
        setPost(prevState => ({...prevState, img:e.target.files[0]}))
    }

    const handleSubmit = async function (e) {
        e.preventDefault()
        const data = new FormData()
        data.append('title', post.title)
        data.append('text', post.text)
        data.append('img', post.img)
        const response = await dispatch(createPost(data))
        if (response.payload?.status===200){
            setPost({ title: "", text: "" , img:''})
            navigate(`/posts/${response.payload.id}`)
        }
    }

    return (
        <div className="createPost">
            <div className="wrapper">
                <div className="createPost_block block">

                    <div className='createPost__title'>
                        <h1 className='title'>Create your post</h1>
                    </div>

                    <div className="createPost_form">
                        <form>
                            {/*<label htmlFor="img">image</label>*/}
                            {/*<input*/}
                            {/*    onChange={e=>handleImg(e)}*/}
                            {/*    accept="image/*"*/}
                            {/*    type="file"/>*/}
                            <label htmlFor="title">Title</label>

                            <input
                                value={post.title}
                                onChange={e=>handleTitle(e)}
                                type="text" placeholder='Title'/>

                            <label htmlFor="text">Text</label>

                            <TextEditor
                                value={post.text}
                                handleText={handleText}
                                id="text"
                                placeholder='text'
                            />


                            {/*<textarea*/}
                            {/*    value={post.text}*/}
                            {/*    onChange={e=>handleText(e)}*/}
                            {/*    id="text" placeholder='text'></textarea>*/}

                            <input
                                onClick={e=>handleSubmit(e)}
                                className='fullBtn' type="submit" value='Create'/>
                        </form>



                    </div>



                </div>
            </div>
        </div>
    );
};

export default CreatePost;