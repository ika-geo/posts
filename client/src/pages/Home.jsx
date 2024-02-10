import React, {useEffect, useState} from 'react';
import PostItem from "../components/Post/Post";
import {useDispatch} from "react-redux";
import {getPosts} from "../store/features/postSlice";
import Loader from "../components/Loader";

const Home = () => {

    const [loader, setloader] = useState(false)

    useEffect(()=>{
        getComments()
    }, [])

    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])

    const getComments = async function(){
        setloader(true)
        const response = await dispatch(getPosts())
        if (response.payload.status===200){
            setPosts(response.payload.data)
        }
        setloader(false)
    }


    if (loader){
        return(
            <Loader/>
        )
    }

    return (
        <div className='home'>
            <div className="wrapper">
                <div className="home_block">
                    <h1 className='title'>Posts</h1>

                    <div className="posts">
                        {posts && posts.map(post =>
                            <PostItem
                                key={post.id}
                                post={post}
                            />
                        )
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;