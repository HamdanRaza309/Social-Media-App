import React, { useState } from 'react';
import Avatar from 'react-avatar';
import profile from '../assets/profile.png';
import { GoComment } from 'react-icons/go';
import { CiHeart, CiBookmark } from 'react-icons/ci';

function Tweet({ tweet }) {
    const [likes, setLikes] = useState(tweet?.like?.length || 0);
    const [bookmarked, setBookmarked] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-2 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-start gap-3">
                {/* Avatar */}
                <Avatar src={profile} size="40" round={true} />
                {/* Tweet Content */}
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-bold text-gray-900">{tweet?.userDetails[0].name}</h1>
                            <p className="text-gray-500 text-sm">
                                @{tweet?.userDetails[0].username} &bull; 1m
                            </p>
                        </div>
                        <div className="text-gray-500 hover:text-gray-700 cursor-pointer">...</div>
                    </div>
                    <p className="mt-2 text-gray-800">{tweet?.description}</p>
                    <div className="flex items-center justify-between mt-3 text-gray-500 text-sm">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-red-500" onClick={handleLike}>
                            <CiHeart size="20px" className={liked ? 'text-red-500' : ''} />
                            <p>{tweet?.like?.length}</p>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                            <GoComment size="18px" />
                            <p>{tweet?.comments?.length || 0}</p>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-500" onClick={handleBookmark}>
                            <CiBookmark size="20px" className={bookmarked ? 'text-yellow-500' : ''} />
                            <p>{tweet?.userDetails[0].bookmarks?.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tweet;