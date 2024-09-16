import React, { useState } from 'react';
import Avatar from "react-avatar";
import profile from '../assets/profile.png';
import { CiImageOn } from "react-icons/ci";

function CreatePost() {
    const [postText, setPostText] = useState('');

    const handlePost = () => {
        if (postText.trim()) {
            console.log("Posted:", postText);
            setPostText('');
        } else {
            alert("Please enter some content to post.");
        }
    };

    return (
        <div className='w-full'>
            <div className="w-full bg-white shadow-sm rounded-lg">
                <div className='flex items-center justify-around border-b border-gray-200'>
                    <div className='cursor-pointer hover:bg-gray-100 w-full text-center px-4 py-3'>
                        <h1 className='font-semibold text-gray-600 text-lg'>For You</h1>
                    </div>
                    <div className='cursor-pointer hover:bg-gray-100 w-full text-center px-4 py-3'>
                        <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                    </div>
                </div>
                <div>
                    <div className='flex items-start p-4'>
                        <Avatar src={profile} size="40" round={true} />
                        <textarea
                            className='w-full outline-none border-none text-lg ml-3 resize-none'
                            rows="3"
                            placeholder="What’s happening?!"
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-between p-4 border-t border-gray-300'>
                        <div className='cursor-pointer text-blue-500 hover:bg-blue-50 p-2 rounded-full'>
                            <CiImageOn size="34px" />
                        </div>
                        <button
                            className={`px-6 py-2 text-lg rounded-full font-semibold text-white transition-all ${postText.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!postText.trim()}
                            onClick={handlePost}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
