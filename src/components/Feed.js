import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'

function Feed() {
    return (
        <div className='w-[50%] border'>
            <div>
                <CreatePost />
                <Tweet />
            </div>
        </div>
    )
}

export default Feed