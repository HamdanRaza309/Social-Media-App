import React, { useState } from 'react';
import Avatar from 'react-avatar';
import profile from '../assets/profile.png';
import { GoComment } from 'react-icons/go';
import { CiHeart, CiBookmark } from 'react-icons/ci';
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getRefresh } from '../redux/tweetSlice';

function Tweet({ tweet }) {
    const [likes, setLikes] = useState(tweet?.like?.length || 0);
    const [bookmarked, setBookmarked] = useState(tweet?.userDetails[0]?.bookmarks?.includes(tweet?._id) || false);
    const [liked, setLiked] = useState(tweet?.like?.includes(tweet?.userDetails[0]?._id) || false);
    const dispatch = useDispatch();

    const handleLikeOrDislike = async (tweetId) => {
        try {
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${tweetId}`, {}, {
                withCredentials: true,
            });

            dispatch(getRefresh());

            if (res.data.success) {
                toast.success(res.data.message);
                setLiked(!liked);
                setLikes(liked ? likes - 1 : likes + 1);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
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
                            <h1 className="font-bold text-gray-900">{tweet?.userDetails[0]?.name}</h1>
                            <p className="text-gray-500 text-sm">
                                @{tweet?.userDetails[0]?.username} &bull; 1m
                            </p>
                        </div>
                        <div className="text-gray-500 hover:text-gray-700 cursor-pointer">...</div>
                    </div>
                    <p className="mt-2 text-gray-800">{tweet?.description}</p>
                    <div className="flex items-center justify-between mt-3 text-gray-500 text-sm">
                        <div
                            className="flex items-center gap-1 cursor-pointer hover:text-red-500"
                            onClick={() => handleLikeOrDislike(tweet?._id)}>
                            <CiHeart size="20px" className={liked ? 'text-red-500' : ''} />
                            <p>{likes}</p>
                        </div>
                        <div
                            className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                            <GoComment size="18px" />
                            <p>{tweet?.comments?.length || 0}</p>
                        </div>
                        <div
                            className="flex items-center gap-1 cursor-pointer hover:text-yellow-500"
                            onClick={() => handleBookmark(tweet?._id)}>
                            <CiBookmark size="20px" className={bookmarked ? 'text-yellow-500' : ''} />
                            <p>{bookmarked ? 1 : 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tweet;
