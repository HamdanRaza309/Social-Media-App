import React, { useState } from 'react';
import twitterLogo from '../assets/twitter_logo.png';

function Login() {
    const [isLoggedin, setIsLoggedin] = useState(true);
    const loginSignupHandler = () => {
        setIsLoggedin(!isLoggedin);
    };

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
                        {isLoggedin ? 'Login' : 'Signup'}
                    </h2>
                    <form className='flex flex-col gap-4 w-[60%]'>
                        {!isLoggedin && (
                            <>
                                <input
                                    type="text"
                                    placeholder='Name'
                                    className='outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium transition-all'
                                />
                                <input
                                    type="text"
                                    placeholder='Username'
                                    className='outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium transition-all'
                                />
                            </>
                        )}
                        <input
                            type="email"
                            placeholder='Email'
                            className='outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium transition-all'
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            className='outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium transition-all'
                        />
                        <button
                            type='submit'
                            className='bg-blue-500 text-white text-lg py-2 mt-6 rounded-full hover:bg-blue-600 transition-colors'
                        >
                            {isLoggedin ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                    {/* Toggle between Login and Signup */}
                    <p className='mt-4 text-gray-700'>
                        {isLoggedin ? "Don't have an account?" : 'Already have an account?'}
                        <span
                            onClick={loginSignupHandler}
                            className='cursor-pointer text-blue-500 underline ml-2'
                        >
                            {isLoggedin ? 'Signup' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
