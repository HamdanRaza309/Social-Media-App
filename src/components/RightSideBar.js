import React from 'react';
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import profile from '../assets/profile.png';

function RightSideBar({ otherUsers = [] }) { // Default to an empty array if undefined
    return (
        <div className='w-[29%] rounded-2xl bg-white'>
            {/* Search Box */}
            <div className='flex items-center p-2 bg-gray-100 rounded-full mb-6'>
                <CiSearch size={24} className="text-gray-500" />
                <input
                    type="text"
                    className='bg-transparent outline-none px-2 w-full text-sm'
                    placeholder='Search'
                />
            </div>

            {/* Who to Follow Section */}
            <div className='p-4 bg-gray-50 rounded-2xl'>
                <h1 className='font-bold text-xl mb-4'>Who to follow</h1>

                {/* Profile Suggestion */}
                {otherUsers?.length > 0 ? (
                    otherUsers.map((user) => (
                        <div key={user?._id} className='flex items-center justify-between gap-2 mb-4 hover:bg-gray-100 p-2 rounded-lg transition'>
                            <div className='flex items-center gap-2'>
                                <Avatar src={profile} size="45" round={true} />
                                <div>
                                    <h1 className='font-semibold text-sm'>{user?.name}</h1>
                                    <p className='text-gray-500 text-sm'>{user?.username}</p>
                                </div>
                            </div>
                            <button className='px-4 py-1 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition'>
                                Profile
                            </button>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 text-sm'>No suggestions available.</p>
                )}
            </div>
        </div>
    );
}

export default RightSideBar;
