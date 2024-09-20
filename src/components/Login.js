import React, { useState } from 'react';
import axios from "axios";
import twitterLogo from '../assets/twitter_logo.png';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginSignupHandler = () => {
        setIsLogin(!isLogin);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(name, username, email, password);

        if (isLogin) {
            // Login User
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/login`, { email, password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if (res.data.success) {
                    navigate('/');
                    toast.success(res.data.message)
                }
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error);

            }
        } else {
            // Register User

            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/register`, { name, username, email, password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if (res.data.success) {
                    setIsLogin(true);
                    toast.success(res.data.message)
                }

            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error);
            }
        }
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden bg-gray-100'>
            <div className='flex flex-col md:flex-row items-center justify-between w-[90%] max-w-6xl p-4'>
                {/* Twitter Logo Section */}
                <div className='hidden md:block md:w-1/2 lg:w-2/5'>
                    <img className='w-full' src={twitterLogo} alt="Twitter Logo" />
                </div>

                {/* Form Section */}
                <div className='flex flex-col w-full md:w-1/2 lg:w-3/5'>
                    <h1 className='font-bold text-4xl md:text-6xl mb-8'>Happening now.</h1>

                    {/* Login/Signup Form */}
                    <h2 className='text-2xl font-bold mb-4'>
                        {isLogin ? 'Login' : 'Signup'}
                    </h2>
                    <form onSubmit={submitHandler} className='flex flex-col gap-4 w-[60%]'>
                        {!isLogin && (
                            <>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder='Name'
                                    className='outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium transition-all'
                                />
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    placeholder='Username'
                                    className='outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium transition-all'
                                />
                            </>
                        )}
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email'
                            className='outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium transition-all'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            className='outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium transition-all'
                        />
                        <button
                            type='submit'
                            className='bg-blue-500 text-white text-lg py-2 mt-6 rounded-full hover:bg-blue-600 transition-colors'
                        >
                            {isLogin ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                    {/* Toggle between Login and Signup */}
                    <p className='mt-4 text-gray-700'>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <span
                            onClick={loginSignupHandler}
                            className='cursor-pointer text-blue-500 underline ml-2'
                        >
                            {isLogin ? 'Signup' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
