import React from 'react';
import cover_img from '../assets/cover_img.png';
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import dp from '../assets/profile.png';
import useGetProfile from '../hooks/useGetProfile';
import { useSelector } from "react-redux";

function Profile() {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    useGetProfile(id);

    return (
        <div className='w-[50%] border-l border-r'>
            <div>
                <div className='flex items-center py-2 gap-2'>
                    <Link to='/' className='p-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
                        <IoArrowBack size="24px" />
                    </Link>
                    <div>
                        <h1 className='font-semibold text-lg'>{profile?.name || 'Name'}</h1>
                        <p className='text-gray-500 text-sm'>10 posts</p>
                    </div>
                </div>
                <img src={cover_img} alt="Cover Pic" />
                <div className='absolute top-44 ml-3 border-4 border-white rounded-full'>
                    <Avatar src={dp} size="120" round={true} />
                </div>
                <div className=' text-right m-2'>
                    <button className='px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200'>Edit Profile</button>
                </div>
                <div className='m-4'>
                    <h1 className="font-semibold text-xl">{profile?.name || 'Name'}</h1>
                    <p className='text-sm text-gray-600'>@{profile?.username || 'Username'}</p>
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
