import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getMyComments} from "../store/features/commentSlice";
import MyComment from "../components/comment/MyComment";
import Loader from "../components/Loader";

const MyComments = () => {

    const [loader, setLoader] = useState(false)

    useEffect(() => {
        handleGetMyComments()
    }, [])

    const [myComments, setMyComments] = useState([])

    const dispatch = useDispatch()

    const handleGetMyComments = async function () {
        setLoader(true)
        const response = await dispatch(getMyComments())
        if (response.payload?.status === 200) {
            setMyComments(response.payload.data)
        }
        setLoader(false)
    }

    if (loader){
        return(
            <Loader/>
        )
    }

    return (
        <div className="myComments">
            <div className="wrapper">
                <div className="myComments_block">
                    <h1 className='title'>My comments</h1>
                    <div className="comments">
                        {myComments && myComments.map(comment =>
                            <MyComment
                                key={comment.id}
                                comment={comment}
                                handleGetMyComments={handleGetMyComments}
                            />
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComments;