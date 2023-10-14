import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {deletePost} from "../../store/features/postSlice";
import {useDispatch} from "react-redux";
import EditPostBlock from "../Post/EditPostBlock";
import {MdModeEdit} from "react-icons/md";
import PostText from "../Text";
import PostItemViews from "../PostItemViews";


const MyPostItem = ({post, handleGetMyPosts}) => {

    const dispatch = useDispatch()


    const [openEditPostBlock, setOpenEditPostBlock] = useState(false)
    const handleCloseEditPostBlock = function () {
        setOpenEditPostBlock(false)
    }
    const handleOpenEditPostBlock = function () {
        setOpenEditPostBlock(true)
    }

    const handleDeletePost = async (id) => {
        await dispatch(deletePost(id))
        handleGetMyPosts()
    }


    return (
        <div className='postItem'>
            <Link className='postItem_title' to={'/posts/' + post.id}>{post.title}</Link>
            <div className='hideAfter6'>
                <PostText
                    text={post.text}
                />
            </div>

            <div className="postItem_additional flex between">
                <div className="postItem_edit">
                    <AiFillDelete
                        className='delete'
                        onClick={() => handleDeletePost(post.id)}
                        color='red'
                        style={{cursor: 'pointer', fontSize: '25px'}}/>
                    <MdModeEdit
                        className='edit'
                        onClick={() => handleOpenEditPostBlock()}
                    />
                </div>

                <PostItemViews
                    views={post.views}
                />


            </div>


            {
                openEditPostBlock &&
                <EditPostBlock
                    post={post}
                    handleCloseEditPostBlock={handleCloseEditPostBlock}
                    handleGetMyPosts={handleGetMyPosts}
                />
            }
        </div>
    );
};

export default MyPostItem;