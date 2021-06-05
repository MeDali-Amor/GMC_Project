import React, { useEffect } from "react";
import "./Publications.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopics, recentTopic } from "../../Redux/actions/topic";
import { CircularProgress } from "@material-ui/core";
import Post from "../../Components/Post/Post";

const Publications = () => {
    const topics = useSelector((state) => state.topicReducer.topics);
    const isloading = useSelector((state) => state.topicReducer.load);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(recentTopic());
    }, []);
    return (
        <div className="publications">
            <div className="loader">{isloading && <CircularProgress />}</div>
            <div className="topic">
                {topics.map((topic) => (
                    <Post key={topic._id} topic={topic} />
                ))}
            </div>
        </div>
    );
};

export default Publications;
