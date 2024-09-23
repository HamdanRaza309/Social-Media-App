import React, { useState } from 'react';
import Avatar from 'react-avatar';
import profile from '../assets/profile.png';
import { GoComment } from 'react-icons/go';
import { CiHeart, CiBookmark } from 'react-icons/ci';
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from '../redux/tweetSlice';
import moment from 'moment'; // for handling date formatting

const Tweet = ({ tweet }) => {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const [likes, setLikes] = useState(tweet?.like?.length || 0);
    const [bookmarked, setBookmarked] = useState(tweet?.userDetails[0]?.bookmarks?.includes(tweet?._id) || false);
    const [liked, setLiked] = useState(tweet?.like?.includes(tweet?.user?._id) || false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle Like/Dislike Toggle
    const handleLikeToggle = async (tweetId) => {
        try {
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${tweetId}`, {}, { withCredentials: true });
            if (res.data.success) {
                dispatch(getRefresh());
                toast.success(res.data.message);
                setLiked(prev => !prev);
                setLikes(prev => liked ? prev - 1 : prev + 1);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    // Handle Tweet Deletion
    const handleDeleteTweet = async (id) => {
        try {
            const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`, { withCredentials: true });
            if (res.data.success) {
                dispatch(getRefresh());
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    // Toggle Modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const confirmDelete = () => {
        handleDeleteTweet(tweet?._id);
        closeModal();
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-2 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-start gap-3">
                {/* Avatar */}
                <Avatar src={profile} size="40" round={true} />

                {/* Tweet Content */}
                <div className="flex-1">
                    <div className="flex justify-between">
                        {/* User Info */}
                        <div>
                            <h1 className="font-bold text-gray-900">{tweet?.userDetails[0]?.name}</h1>
                            <p className="text-gray-500 text-sm">
                                @{tweet?.userDetails[0]?.username} &bull; {moment(tweet?.createdAt).fromNow()}
                            </p>
                        </div>

                        {/* Delete Icon */}
                        {user?._id === tweet?.userDetails[0]?._id && (
                            <div className="text-gray-500 cursor-pointer" onClick={openModal}>
                                <RiDeleteBin6Line size="20px" className="hover:text-red-500" />
                            </div>
                        )}
                    </div>

                    {/* Tweet Description */}
                    <p className="mt-2 text-gray-800">{tweet?.description}</p>

                    {/* Interaction Buttons */}
                    <div className="flex items-center justify-between mt-3 text-gray-500 text-sm">
                        <div
                            className={`flex items-center gap-1 cursor-pointer hover:text-red-500 ${liked ? 'text-red-500' : ''}`}
                            onClick={() => handleLikeToggle(tweet?._id)}
                        >
                            <CiHeart size="20px" />
                            <p>{likes}</p>
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                            <GoComment size="18px" />
                            <p>{tweet?.comments?.length || 0}</p>
                        </div>

                        <div
                            className={`flex items-center gap-1 cursor-pointer hover:text-yellow-500 ${bookmarked ? 'text-yellow-500' : ''}`}
                        >
                            <CiBookmark size="20px" />
                            <p>{bookmarked ? 1 : 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for delete confirmation */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Delete Tweet</h2>
                        <p>Are you sure you want to delete this tweet?</p>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tweet;
