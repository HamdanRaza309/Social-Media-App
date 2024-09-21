import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

function Feed() {
    const { tweets } = useSelector(store => store.tweet);

    return (
        <div className='w-[50%] border'>
            <div>
                <CreatePost />
                {
                    tweets && tweets.length > 0 ? (
                        tweets.map((tweet) =>
                            <Tweet key={tweet?._id} tweet={tweet} />
                        )
                    ) : (
                        <p>No tweets available</p>
                    )
                }
            </div>
        </div>
    )
}

export default Feed;