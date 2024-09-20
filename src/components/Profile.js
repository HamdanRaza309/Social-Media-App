import React from 'react';
import cover_img from '../assets/cover_img.png';
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Avatar from "react-avatar";
import profile from '../assets/profile.png';
import useGetProfile from '../hooks/useGetProfile';
import { useSelector } from "react-redux";

function Profile() {
    // Access the user object from the Redux store
    const { user } = useSelector(store => store.user);

    // Fetch user profile using the custom hook
    useGetProfile(user?._id);

    // Handle loading or fallback in case user is not yet defined
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-[50%] border-l border-r'>
            <div>
                <div className='flex items-center py-2 gap-2'>
                    <Link to='/' className='p-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
                        <IoArrowBack size="24px" />
                    </Link>
                    <div>
                        <h1 className='font-semibold text-lg'>{user?.name || 'Name'}</h1>
                        <p className='text-gray-500 text-sm'>10 posts</p>
                    </div>
                </div>
                <img src={cover_img} alt="Cover Pic" />
                <div className='absolute top-44 ml-3 border-4 border-white rounded-full'>
                    <Avatar src={profile} size="120" round={true} />
                </div>
                <div className=' text-right m-2'>
                    <button className='px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200'>Edit Profile</button>
                </div>
                <div className='m-4'>
                    <h1 className="font-semibold text-xl">{user?.name || 'Name'}</h1>
                    <p className='text-sm text-gray-600'>@{user?.username || 'Username'}</p>
                </div>
                <div className='m-4'>
                    <p>Web developer passionate about building responsive, user-friendly websites and applications.
                        Turning ideas into reality with code and creativity.</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
