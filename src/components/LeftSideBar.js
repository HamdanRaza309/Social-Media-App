import React from 'react';
import twitterLogo from '../assets/twitter_logo.png';
import { CiHome, CiHashtag, CiUser, CiBookmark, CiLogout } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

function LeftSideBar() {
    return (
        <div>
            <div>
                <div>
                    <img className='ml-3' width={"40px"} src={twitterLogo} alt="twitter-logo" />
                </div>
                <div className='my-4'>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiHome size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Home</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiHashtag size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Explore</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <IoIosNotificationsOutline size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Notifications</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiUser size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Profile</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiBookmark size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Bookmarks</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiLogout size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Logout</h1>
                    </div>
                    <button className='px-4 py-2 border-none text-md bg-[#1d98f0] w-full rounded-full text-white font-semibold'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar