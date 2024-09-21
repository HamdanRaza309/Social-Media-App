import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMyTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_ENDPOINT}/alltweets/${id}`, {
                    withCredentials: true
                });
                console.log(res);
                dispatch(getAllTweets(res.data.tweets));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyTweets();
    }, [id]);
};
export default useGetMyTweets;