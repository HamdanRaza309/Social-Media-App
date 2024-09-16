import React, { useState } from 'react';
import Avatar from "react-avatar";
import profile from '../assets/profile.png';
import { GoComment } from "react-icons/go";
import { CiHeart, CiBookmark } from "react-icons/ci";

function Tweet() {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [bookmarks, setBookmarks] = useState(0);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
        setBookmarks(bookmarked ? bookmarks - 1 : bookmarks + 1);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* First Tweet */}
            <div className="border-b border-gray-300 mb-4 p-4 hover:bg-gray-50 transition duration-200">
                <div className="flex items-start gap-4">
                    <Avatar src={profile} size="40" round={true} />
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h1 className="font-semibold">Arman</h1>
                                <p className="text-gray-500 text-sm">@khanarman . 1m</p>
                            </div>
                            <p className="text-gray-400 text-sm cursor-pointer hover:underline">...</p>
                        </div>
                        <div className="mt-2">
                            <p>Asalam O Alaikom, let's connect and achieve our goals.</p>
                        </div>
                        <div className="flex items-center justify-start gap-6 mt-3 text-gray-500">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-red-500" onClick={handleLike}>
                                <CiHeart size="24px" className={liked ? "text-red-500" : ""} />
                                <p>{likes}</p>
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                                <GoComment size="20px" />
                                <p>{comments}</p>
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-500" onClick={handleBookmark}>
                                <CiBookmark size="24px" className={bookmarked ? "text-yellow-500" : ""} />
                                <p>{bookmarks}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tweet;
