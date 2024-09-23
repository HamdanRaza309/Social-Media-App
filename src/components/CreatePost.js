import React, { useState } from 'react';
import Avatar from "react-avatar";
import profile from '../assets/profile.png';
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';
import { useDispatch, useSelector } from "react-redux";

function CreatePost() {
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const { isActive } = useSelector(store => store.tweet)

    const handlePost = async () => {
        if (!description.trim()) {
            toast.error("Please enter some content to post.");
            return;
        }

        try {
            const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, { description }, { withCredentials: true });

            dispatch(getRefresh());

            if (res.data.success) {
                toast.success(res.data.message);
                setDescription('');
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const handleForYouTweets = () => {
        dispatch(getIsActive(true))
    }
    const handleFollowingTweets = () => {
        dispatch(getIsActive(false))
    }

    return (
        <div className="w-full">
            <div className="w-full bg-white shadow-sm rounded-lg">
                <div className="flex items-center justify-around border-b border-gray-200">
                    <div onClick={handleForYouTweets} className={`${isActive ? "border-b-4 border-blue-400" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-100 w-full text-center px-4 py-3`}>
                        <h1 className="font-semibold text-gray-600 text-lg">For You</h1>
                    </div>
                    <div onClick={handleFollowingTweets} className={`${isActive ? "border-b-4 border-transparent" : "border-b-4 border-blue-400"} cursor-pointer hover:bg-gray-100 w-full text-center px-4 py-3`}>
                        <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
                    </div>
                </div>

                {/* Post creation section */}
                <div>
                    <div className="flex items-start p-4">
                        <Avatar src={profile} size="40" round={true} />
                        <textarea
                            className="w-full outline-none border-none text-lg ml-3 resize-none"
                            rows="3"
                            placeholder="What’s happening?!"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 border-t">
                        <div className="cursor-pointer text-blue-500 hover:bg-blue-50 p-2 rounded-full">
                            <CiImageOn size="34px" />
                        </div>
                        <button
                            className={`px-6 py-2 text-lg rounded-full font-semibold text-white transition-all 
                                ${description.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!description.trim()}
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
