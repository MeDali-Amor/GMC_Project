import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Post.css";
// require("dotenv").config();
import { MoreVert, ThumbUpAlt } from "@material-ui/icons";
import { getOneUser, getAllUsers } from "../../Redux/actions/user";
import { CircularProgress } from "@material-ui/core";
import {
    recommendTopic,
    deleteTopic,
    commentTopic,
} from "../../Redux/actions/topic";
const Post = ({ topic, key, setReloadA, reloadA }) => {
    // const [user, setUser] = useState({});
    const [commentInput, setCommentInput] = useState("");
    // const [comments, setComments] = useState([]);
    const currentUser = useSelector((state) => state.userReducer.user);
    const isloading = useSelector((state) => state.topicReducer.load);
    const isAuth = useSelector((state) => state.userReducer.isAuth);

    const dispatch = useDispatch();
    const history = useHistory();

    const addComment = (e) => {
        if (commentInput !== "") {
            e.preventDefault();
            let topic_id = topic._id;
            dispatch(commentTopic({ commentInput }, topic_id)).then(() =>
                window.location.reload()
            );
            // .then(() =>
            //     setReloadA(!reloadA)
            // );
            setCommentInput("");
        } else e.preventDefault();
    };
    const handleDelete = () => {
        const topic_id = topic._id;

        dispatch(deleteTopic(topic_id)).then(() => window.location.reload());
    };
    const likeTopic = () => {
        let user_id = currentUser._id;
        let topicId = topic._id;
        dispatch(recommendTopic({ user_id }, topicId)).then(() =>
            window.location.reload()
        );
        // .then(() =>
        //     setReloadA(!reloadA)
        // );
        // window.location.reload();
    };
    return (
        <div>
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left">
                        <Link
                            exact
                            className="post-top-left-link"
                            to={`/profile/${topic.postedBy}`}
                        >
                            <img
                                className="post-userpic"
                                src={topic.avatar}
                                alt=""
                            />
                            <span className="post-username">{topic.name}</span>
                        </Link>
                        {/* <span className="post-date">
                            {moment().format(topic.createdAt)}
                        </span> */}
                    </div>

                    {(currentUser._id == topic.postedBy ||
                        currentUser.role == "admin") && (
                        <button
                            className="post-top-right"
                            onClick={handleDelete}
                        >
                            delete
                        </button>
                    )}
                </div>
                <div className="post-center">
                    <div className="post-title">{topic.title}</div>
                    <span className="topicInline">
                        <div className="postField">{topic.field}</div>
                        <div className="postAuthors">{topic.authors}</div>
                    </span>

                    <div className="postAbstract">
                        <h6 className="abstractTitle">Abstract:</h6>
                        <p className="abstractText">{topic.textContent}</p>
                    </div>
                    <a
                        href={`${process.env.REACT_APP_PROXY}/api/topic/img/${topic._id}`}
                        target="blank"
                    >
                        <button
                            className="postBtn"
                            onClick={() => {
                                !isAuth && history.push("/login");
                            }}
                        >
                            View Publication
                        </button>
                    </a>
                    {/* <img
                        src={`${process.env.REACT_APP_PROXY}/api/topic/img/${topic._id}`}
                        alt=""
                        className="post-pic"
                    /> */}
                    {/* <a
                        href={`${process.env.REACT_APP_PROXY}/api/topic/img/${topic._id}`}
                        target="blank"
                    >
                        txt
                    </a> */}
                </div>
                {isAuth && (
                    <>
                        <div className="post-bottom">
                            <div className="post-bottom-left">
                                <ThumbUpAlt
                                    className={
                                        topic.recommends.includes(
                                            currentUser._id
                                        )
                                            ? "liked"
                                            : "like-thumb"
                                    }
                                    onClick={likeTopic}
                                />
                                <span className="like-counter">
                                    {topic.recommends.length === 0 ? (
                                        <p>
                                            {" "}
                                            be the first to recommend this post
                                        </p>
                                    ) : topic.recommends.length === 1 ? (
                                        topic.recommends.includes(
                                            currentUser._id
                                        ) ? (
                                            <p>you recommend this post</p>
                                        ) : (
                                            <p>
                                                one person recommended this post
                                            </p>
                                        )
                                    ) : (
                                        <p>
                                            {topic.recommends.length} people
                                            recommended this post
                                        </p>
                                    )}{" "}
                                </span>
                            </div>
                            <div className="post-bottom-right">
                                <div className="comment-counter">
                                    {topic.comments.length == 1 ? (
                                        <>{topic.comments.length} comment</>
                                    ) : (
                                        <>{topic.comments.length} comments</>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="post-bottom-comment">
                    {isAuth && (
                        <>
                            <form onSubmit={addComment}>
                                <input
                                    type="text"
                                    className="comment_area"
                                    value={commentInput}
                                    onChange={(e) =>
                                        setCommentInput(e.target.value)
                                    }
                                />
                            </form>
                        </>
                    )}
                </div>
                {/* {comments.map((comment) => (
                    <div className="comment_body">{comment.content}</div>
                ))} */}
                <div className="comments">
                    {topic.comments.map((comment) => (
                        <>
                            <div className="comment_head">
                                <img
                                    className="post-userpic"
                                    src={comment.avatar}
                                    alt=""
                                />
                                <span className="post-username">
                                    {comment.name}
                                </span>
                            </div>

                            <div className="comment_body">
                                {comment.content}
                            </div>
                            <hr />
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Post;
{
}
