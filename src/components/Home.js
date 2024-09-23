import React, { useEffect } from 'react'
import LeftSideBar from "./LeftSideBar";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from '../hooks/useOtherUsers';
import { useSelector } from 'react-redux';
import useGetMyTweets from '../hooks/useGetMyTweets';

function Home() {
    const { user, otherUsers } = useSelector(store => store.user);

    // custom hooks
    useOtherUsers(user?._id);
    useGetMyTweets(user?._id);

    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])


    return (
        <div className='flex justify-between w-[80%] mx-auto'>
            <LeftSideBar />
            <Outlet />
            <RightSideBar otherUsers={otherUsers} />
        </div>
    )
}

export default Home