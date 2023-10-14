import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {toast} from "react-toastify";
import handleBackEndError from "../../utils/handleBackEndError";


export const getCommentsByPostId = createAsyncThunk('/posts/getCommentsByPostId', async function (id) {
    try {
        const response = await axios.get(`/comments/${id}`)
        return {
            status: response.status,
            data: response.data
        };
    } catch (e) {
        handleBackEndError(e)
    }
})


export const getMyComments = createAsyncThunk('comments/getMyComments', async function () {
    try{
        const response = await axios.get('/comments/myComments')
        return {
            data:response.data,
            status:response.status
        }
    }
    catch (e) {
        handleBackEndError(e)
    }
})

export const createComment = createAsyncThunk('comments/createComment', async function ({ text, postId }) {
    try {
        const response = await axios.post('/comments', { text, postId });
        toast.success(response.data.message);
        return response.status;
    } catch (e) {
        handleBackEndError(e)
    }
});

export const editComment = createAsyncThunk('comments/editComment', async function ({text, id}) {
    try{
        const response = await axios.put(`/comments/${id}`, {text, id})
        toast.success(response.data.message)
        return response.status
    }
    catch (e) {
        handleBackEndError(e)
    }
})

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id) => {
    try {
        const response = await axios.delete(`/comments/${id}`)
        toast.success(response.data.message)
        return response.status
    } catch (e) {
        handleBackEndError(e)
    }
})