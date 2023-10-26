import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser, logOut} from "../../../store/features/userSlice";
import {Link} from "react-router-dom";

import {IoCloseSharp} from 'react-icons/io5'
const HeaderLoginRegister = () => {



    const dispatch = useDispatch()

    const user = useSelector(state => state.user)


    const [loginBlock, setLoginBlock] = useState(false)
    const [inputName, setInputName] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        if (inputName && inputPassword) {
            setLoginBlock(false)
            setInputName('')
            setInputPassword('')
            dispatch(loginUser({email: inputName, password: inputPassword}))
        }
    }
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logOut())
    }

    const openLoginBlock = () => {
        setLoginBlock(true)
    }
    const closeLoginBlock = () => {
        setLoginBlock(false)
    }

    if (user?.name) {
        return (
            <div className='header_user'>
                <h2>Hello {user.name}</h2>
                <div className='header_logout button' onClick={e => handleLogout(e)}>Logout</div>
            </div>
        )
    }

    return (
        <>
            <div className="login">
                <div className='button' onClick={openLoginBlock}>Login</div>
                {loginBlock &&
                    <div className="loginBlock">
                        <div className="loginInside">

                            <div className="close">
                                <IoCloseSharp
                                    className='close'
                                    onClick={closeLoginBlock}
                                />
                            </div>

                            <form className='header_login'>

                                <h1 className='login_title'>Login</h1>

                                <label htmlFor="loginEmail">Email</label>
                                <input
                                    value={inputName}
                                    onChange={e => setInputName(e.target.value)}
                                    id='loginEmail'
                                    type="email"/>

                                <label htmlFor="loginPassword">Password</label>
                                <input
                                    value={inputPassword}
                                    onChange={e => setInputPassword(e.target.value)}
                                    id='loginPassword'
                                    type="password"/>

                                <button className='fullBtn' onClick={e => handleLogin(e)}>Log in</button>
                                <div className='flex between'>
                                    <span>Have not yet Account?</span>
                                    <Link onClick={() => setLoginBlock(false)} to='/register' className='btnRegister clickButton'>Register</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default HeaderLoginRegister;