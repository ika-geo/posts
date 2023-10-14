import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {toast} from "react-toastify";
import handleBackEndError from "../../utils/handleBackEndError";



export const getPosts = createAsyncThunk('posts/getPosts', async function () {
    try{
        const response = await axios.get('/posts')
        return {
            data:response.data,
            status:response.status
        }
    }
    catch (e) {
        handleBackEndError(e)
    }
})

export const createPost = createAsyncThunk('posts/createPost', async function(data){
    try{
        const response = await axios.post('/posts', data)
        toast.success(response.data.message)
        return {
            status:response.status,
            id:response.data.id
        }
    }
    catch (e) {
        handleBackEndError(e)
    }
})

export const getMyPosts = createAsyncThunk('/posts/getMyPosts', async function(){
    try{
        const response = await axios.get('/posts/myPosts')
        return response.data
    }
    catch (e) {
        toast.error(e.response.data.message)
        return false
    }
})

export const getPost = createAsyncThunk('/posts/getPost', async function(id){
    try{
        const response = await axios.get(`/posts/${id}`)
        return response.data
    }
    catch (e) {
        toast.error(e.response.data.message)
        return false
    }
})

export const editPost = createAsyncThunk('posts/editPost', async function ({text, title, id}) {
    try {
        const response = await axios.put(`/posts/${id}`, {text, title})
        toast.success(response.data.message)
        return response.status
    }
    catch (e) {
        handleBackEndError(e)
    }
})


export const deletePost = createAsyncThunk('posts/deletePost', async function (id) {
    try{
        const response = await axios.delete(`/posts/${id}`)
        toast.success(response.data.message)
    }
    catch(e){
        handleBackEndError(e)
    }

})