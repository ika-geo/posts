import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {toast} from "react-toastify";
import cookie from "js-cookie";
import handleBackEndError from "../../utils/handleBackEndError";

const initialState = {
    name:null,
    id:null
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async (user, {dispatch}) => {
        try {
            const response = await axios.post('/auth/register', {
                name: user.name,
                email: user.email,
                password: user.password
            })
            if (response.status === 200) {
                localStorage.setItem('authorization', response.headers['authorization'])
                toast.success(`${response.data.message}`)
                dispatch(setUser(response.data))
                return response.status
            }
        } catch (e) {
            handleBackEndError(e)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async function (user, {dispatch}) {
        try {

            const response = await axios.post('/auth/login', {
                    email: user.email,
                    password: user.password
                }
            )
            if (response.status === 200) {
                dispatch(setUser(response.data))
                localStorage.setItem('authorization', response.headers['authorization'])
            }
        } catch (e) {
            handleBackEndError(e)
        }
    }
)



export const getMe = createAsyncThunk(
    'auth/checkMe',
    async function (_, {dispatch}) {
        try{
            const response = await axios.post('/auth/getMe')
            if (response.status===200){
                dispatch(setUser(response.data))
                if (response.headers['authorization']){
                    localStorage.setItem('authorization', response.headers['authorization'])
                }
            }
            else if (response.status===(401||500)){
                dispatch(logOut)
            }
        }
        catch (e) {
            toast.info('Log in please')
            if (localStorage.getItem('authorization')){
                localStorage.removeItem('authorization')
            }
            if (cookie.get('Refreshtoken')){
                cookie.remove('Refreshtoken')
            }
        }
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name
            state.id=action.payload.id
        },
        logOut:(state)=>{
            state.name=null
            state.id=null
            localStorage.removeItem('authorization')
            cookie.remove('Refreshtoken')
        }
    }
})


export const {setUser, logOut} = userSlice.actions
export default userSlice.reducer