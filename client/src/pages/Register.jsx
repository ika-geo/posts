import React, {useState} from 'react';
import '../assets/style/pages/register.css'
import {registerUser} from "../store/features/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader";

const Register = () => {

    const [loader, setLoader] = useState(false)

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })


    const navigate = useNavigate()

    const handleInputName = function (e) {
        setUser(prevSTate=>({...prevSTate, name:e.target.value}))
    }

    const handleInputEmail = function (e) {
        setUser(prevSTate=>({...prevSTate, email:e.target.value}))
    }

    const handleInputPassword = function (e) {
        setUser(prevSTate=>({...prevSTate, password:e.target.value}))
    }

    const dispatch = useDispatch()
    const handleRegister = async function (e) {
        e.preventDefault();
        setLoader(true)
        if (user){
            const userData = {
                name: user.name,
                email: user.email,
                password: user.password,
            };
            const response = await dispatch(registerUser(userData))
            if (response.payload===200){
                setUser({
                    name: '',
                    email: '',
                    password: '',
                })
                navigate('/myPosts')
            }
            setLoader(false)
        }
    };

    if (loader){
        return(
            <Loader/>
        )
    }

    return (
        <div className='register'>
            <div className="wrapper">
                <div className="register_block">
                    <form>
                        <h1>Register</h1>

                        <label htmlFor="name">Name</label>
                        <input
                            value={user.name}
                            onChange={e=>handleInputName(e)}
                            id='name'
                            type="text"/>

                        <label htmlFor="email">Email</label>
                        <input
                            value={user.email}
                            onChange={e=>handleInputEmail(e)}
                            id='email'
                            type="email"/>

                        <label htmlFor="password">Password</label>
                        <input
                            value={user.password}
                            onChange={e=>handleInputPassword(e)}
                            id='password'
                            type="password"/>

                        <input onClick={e=>handleRegister(e)}
                               type="submit"
                               className='fullBtn'
                               value='Register'/>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;