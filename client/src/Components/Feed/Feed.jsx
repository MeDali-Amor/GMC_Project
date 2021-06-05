import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import { currentUserTopics, timelineTopics } from "../../Redux/actions/topic";
import { CircularProgress } from "@material-ui/core";
const Feed = () => {
    const users = useSelector((state) => state.userReducer.users);
    const currentUser = useSelector((state) => state.userReducer.user);
    const isloading = useSelector((state) => state.topicReducer.load);
    const topics = useSelector((state) => state.topicReducer.topics);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(timelineTopics());
        // dispatch(getAllUsers());
    }, []);

    return (
        <div className="feed">
            <div className="feed-wrapper">
                <Share />
                <div className="loader">
                    {isloading && <CircularProgress />}
                </div>

                {topics.map((topic) => (
                    <Post key={topic._id} topic={topic} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
