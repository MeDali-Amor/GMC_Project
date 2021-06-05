import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./UserTopics.css";
import {
    currentUserTopics,
    getAllTopics,
    getUserTopics,
    timelineTopics,
} from "../../Redux/actions/topic";
import { getOneUser, getAllUsers } from "../../Redux/actions/user";
import { CircularProgress } from "@material-ui/core";

const UserTopics = ({ user, topics, setReloadA, reloadA }) => {
    // const userTopics = useSelector((state) => state.topicReducer.topics);
    const currentUser = useSelector((state) => state.userReducer.user);
    // const user = useSelector((state) => state.userReducer.otherUser);
    const isloading = useSelector((state) => state.topicReducer.load);
    // const [topics, setTopics] = useState([]);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     // dispatch(currentUserTopics());
    //     // dispatch(getAllUsers());
    //     let user_id = user._id;
    //     dispatch(getUserTopics(user_id));
    // }, [user._id]);
    // useEffect(() => {
    //     setTopics(userTopics);
    // }, [userTopics]);
    // useEffect(() => {
    //     dispatch(getAllTopics());
    // });
    // useEffect(() => {
    //     // dispatch(getAllTopics());
    //     const all = userTopics.filter((t) => t.postedBy == user._id);
    //     setTopics(all);
    // }, []);
    return (
        <div className="feed">
            <div className="feed-wrapper">
                {user._id === currentUser._id && <Share />}
                {topics.length == 0 && (
                    <h5>
                        you don't have any posts yet! <br /> Share your fist
                        Topic
                    </h5>
                )}
                <div className="loader">
                    {isloading && <CircularProgress />}
                </div>
                {topics.map((topic) => (
                    <Post
                        key={topic._id}
                        topic={topic}
                        setReloadA={setReloadA}
                        reloadA={reloadA}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserTopics;
