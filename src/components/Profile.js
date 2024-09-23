import React, { useEffect, useState } from 'react';
import cover_img from '../assets/cover_img.png';
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import dp from '../assets/profile.png';
import useGetProfile from '../hooks/useGetProfile';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { TWEET_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import { followingUpdate } from '../redux/userSlice';
import Tweet from './Tweet';

function Profile() {
    const dispatch = useDispatch();
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    useGetProfile(id);

    const [tweets, setTweets] = useState([]);

    const handleFollowAndUnfollow = async () => {
        if (user.following.includes(id)) {
            // Unfollow
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`, {}, { withCredentials: true });
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        } else {
            // Follow
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`, {}, { withCredentials: true });
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    const handleTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/tweets`, { withCredentials: true });
            setTweets(res.data.tweets);
        } catch (error) {
            console.log('Error fetching tweets:', error);
        }
    }

    useEffect(() => {
        handleTweets();
    }, [id]);

    return (
        <div className='w-[50%] border-l border-r'>
            <div>
                <div className='flex items-center py-2 gap-2'>
                    <Link to='/' className='p-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
                        <IoArrowBack size="24px" />
                    </Link>
                    <div>
                        <h1 className='font-semibold text-lg'>{profile?.name || 'Name'}</h1>
                        <p className='text-gray-500 text-sm'>{tweets.length} posts</p>
                    </div>
                </div>
                <img src={cover_img} alt="Cover Pic" />
                <div className='absolute top-44 ml-3 border-4 border-white rounded-full'>
                    <Avatar src={dp} size="120" round={true} />
                </div>
                <div className='text-right m-2'>
                    {user?._id === profile?._id ? (
                        <button className='px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200'>
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            onClick={handleFollowAndUnfollow}
                            className='bg-black text-white px-6 py-1 rounded-full border-2 border-black hover:text-black hover:border-gray-400 hover:bg-gray-200'>
                            {user.following.includes(id) ? 'Following' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className='m-4'>
                    <h1 className="font-semibold text-xl">{profile?.name || 'Name'}</h1>
                    <p className='text-sm text-gray-600'>@{profile?.username || 'Username'}</p>
                </div>
                <div className='m-4'>
                    <p>
                        Web developer passionate about building responsive, user-friendly websites and applications.
                        Turning ideas into reality with code and creativity.
                    </p>
                </div>

                {/* Followers and Following Section */}
                <div className='flex justify-start m-4 gap-8'>
                    <div className='text-center'>
                        <p className='font-semibold text-lg'>{profile?.followers?.length || 0}</p>
                        <p className='text-sm text-gray-500'>Followers</p>
                    </div>
                    <div className='text-center'>
                        <p className='font-semibold text-lg'>{profile?.following?.length || 0}</p>
                        <p className='text-sm text-gray-500'>Following</p>
                    </div>
                </div>
            </div>

            {/* Render Tweets */}
            <div>
                {tweets && tweets.length > 0 ? (
                    tweets.map(tweet => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))
                ) : (
                    <p>No tweets available</p>
                )}
            </div>
        </div>
    );
}

export default Profile;