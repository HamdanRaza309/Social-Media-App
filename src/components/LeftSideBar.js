import React from 'react';
import twitterLogo from '../assets/twitter_logo.png';
import { CiHome, CiHashtag, CiUser, CiBookmark, CiLogout } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

function LeftSideBar() {
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(getUser(null));
                dispatch(getOtherUsers(null));
                dispatch(getMyProfile(null));
                navigate('/login');
            }
        } catch (error) {
            console.log('Something went wrong during Logout.');
            toast.error(error.response.data.message);
            navigate('/');
        }
    }
    return (
        <div className='w-[20%]'>
            <div>
                <div>
                    <img className='ml-3' width={"40px"} src={twitterLogo} alt="twitter-logo" />
                </div>
                <div className='my-4'>
                    <Link to='/' className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiHome size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Home</h1>
                    </Link>
                    <Link className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiHashtag size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Explore</h1>
                    </Link>
                    <Link className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <IoIosNotificationsOutline size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Notifications</h1>
                    </Link>
                    {
                        user ? (
                            <Link to={`/profile/${user._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                                <div>
                                    <CiUser size="24px" />
                                </div>
                                <h1 className='font-semibold text-lg ml-2'>Profile</h1>
                            </Link>
                        ) : (
                            <p className='text-center text-gray-500'>Loading profile...</p>
                        )
                    }
                    <Link className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiBookmark size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Bookmarks</h1>
                    </Link>
                    <Link onClick={handleLogout} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <CiLogout size="24px" />
                        </div>
                        <h1 className='font-semibold text-lg ml-2'>Logout</h1>
                    </Link>
                    <button className='px-4 py-2 border-none text-md bg-[#1d98f0] w-full rounded-full text-white font-semibold'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar