import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getMyPosts} from "../store/features/postSlice";
import MyPostItem from "../components/comment/MyPostItem";
import Loader from "../components/Loader";

const MyPosts = () => {

    const [loader, setLoader] = useState(false)

    useEffect(()=>{
        handleGetMyPosts()
    }, [])

    const [myPosts, setMyPosts] = useState([])

    const dispatch = useDispatch()

    const handleGetMyPosts = async function (){
        setLoader(true)
        const posts = await dispatch(getMyPosts())
        setMyPosts(posts.payload)
        setLoader(false)
    }

    if (loader){
        return(
            <Loader/>
        )
    }

    return (
        <div className='myPosts block'>
            <div className="wrapper">
                <div className="myPosts_block">

                    <div className="myBlogs_top">
                        <h1 className='title'>My Posts</h1>
                        <Link to='/createPost' className='createPost button'>Create post</Link>
                    </div>

                    <div className="posts">

                            {!myPosts.length&&
                                <h1 className='title'>You have not posts</h1>
                            }
                            {myPosts&&myPosts.map(post=>
                                <MyPostItem
                                    key={post.id}
                                    post={post}
                                    handleGetMyPosts={handleGetMyPosts}
                                />
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPosts;