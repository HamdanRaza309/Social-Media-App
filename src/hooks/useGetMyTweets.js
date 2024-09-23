import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector((store) => store.tweet);

    const fetchMyTweets = async () => {
        try {
            const { data } = await axios.get(`${TWEET_API_ENDPOINT}/alltweets/${id}`, {
                withCredentials: true,
            });
            dispatch(getAllTweets(data.tweets));
        } catch (error) {
            console.error("Error fetching user's tweets:", error);
        }
    };

    const fetchFollowingTweets = async () => {
        try {
            const { data } = await axios.get(`${TWEET_API_ENDPOINT}/followingtweets`, {
                withCredentials: true,
            });
            dispatch(getAllTweets(data.tweets));
        } catch (error) {
            console.error("Error fetching following tweets:", error);
        }
    };

    useEffect(() => {
        if (isActive) {
            fetchMyTweets();
        } else {
            fetchFollowingTweets();
        }
    }, [refresh, isActive]);
};

export default useGetMyTweets;