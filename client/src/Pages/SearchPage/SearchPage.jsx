import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "../../Components/Post/Post";
import UserCard from "../../Components/UserCard/UserCard";
import "./SearchPage.css";

const SearchPage = () => {
    const isLoading = useSelector((state) => state.userReducer.load);
    const users = useSelector((state) => state.userReducer.users);
    const usersResult = useSelector((state) => state.userReducer.results);
    const topicsResult = useSelector((state) => state.topicReducer.results);
    const [clickedUser, setClickedUser] = useState(false);
    const [clickedTopic, setClickedTopic] = useState(false);
    // const [result, setResult] = useState([]);
    // useEffect(() => {
    //     setResult(users);
    // }, [][users]);
    const userClick = () => {
        setClickedUser(true);
        setClickedTopic(false);
    };
    const topicClick = () => {
        setClickedUser(false);
        setClickedTopic(true);
    };
    return (
        <div className="search-container">
            <span>
                <button className="searchBtn" onClick={userClick}>
                    Users
                </button>{" "}
                <button className="searchBtn" onClick={topicClick}>
                    Publications
                </button>
            </span>
            {/* <h1>result page</h1> */}
            {isLoading && (
                <div className="loader">
                    <CircularProgress />
                </div>
            )}

            {clickedTopic ? (
                topicsResult.length === 0 ? (
                    <h4 className="noResult">No topic was found</h4>
                ) : (
                    <div className="topic">
                        {topicsResult.map((topic) => (
                            <Post key={topic._id} topic={topic} users={users} />
                            // <h1>{topic.textContent}</h1>
                        ))}
                    </div>
                )
            ) : usersResult.length === 0 ? (
                <h4 className="noResult">No user was found</h4>
            ) : (
                <div className="user">
                    {usersResult.map((user) => (
                        // <UserCard user={user} key={user._id} />
                        <div className="serachUserCard">
                            <img src={user.profilePicture} alt="" />
                            <Link to={`/profile/${user._id}`}>
                                <div className="searchUsername">
                                    <span className="userFname">
                                        {user.first_name}
                                    </span>{" "}
                                    <span className="userLname">
                                        {user.last_name}
                                    </span>
                                </div>
                            </Link>
                            <div className="searchUserEmail">{user.email}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
