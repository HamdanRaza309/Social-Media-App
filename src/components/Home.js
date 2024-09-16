import React from 'react'
import LeftSideBar from "./LeftSideBar";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";
import { Outlet } from "react-router-dom";

function Home() {
    return (
        <div className='flex justify-between w-[80%] mx-auto'>
            <LeftSideBar />
            <Outlet />
            <RightSideBar />
        </div>
    )
}

export default Home