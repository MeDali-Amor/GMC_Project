import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import Modal from "react-bootstrap/Modal";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import Feed from "../../Components/Feed/Feed";
import UserTopics from "../../Components/UserTopics/UserTopics";
import SidebarLeft from "../../Components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../Components/SidebarRight/SidebarRight";
import { useEffect } from "react";
import { followUser, getOneUser, updateUser } from "../../Redux/actions/user";
import { useState } from "react";
import { getUserTopics } from "../../Redux/actions/topic";

const Profile = () => {
    const currentUser = useSelector((state) => state.userReducer.user);
    const otherUser = useSelector((state) => state.userReducer.otherUser);
    const topics = useSelector((state) => state.topicReducer.topics);
    const [user, setUser] = useState({});
    const [description, setDescription] = useState("");
    const [institution, setInstitution] = useState("");
    const [location, setLocation] = useState("");
    const [position, setPosition] = useState("");
    const [degree, setDegree] = useState("");
    const [show, setShow] = useState(false);
    const [reloadA, setReloadA] = useState(false);
    const id = useParams().id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneUser(id));
        // if (id !== currentUser._id) return setUser(otherUser);
        // else;
    }, [id]);
    useEffect(() => {
        if (id !== currentUser._id) return setUser(otherUser);
        else;
        setUser(currentUser);
    }, [otherUser]);
    useEffect(() => {
        // dispatch(currentUserTopics());
        // dispatch(getAllUsers());
        let user_id = user._id;
        dispatch(getUserTopics(user_id));
    }, [user._id, reloadA]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEdit = (e) => {
        let id = user._id;
        let updateInput = {
            description: description,
            establishement: institution,
            location: location,
            position: position,
            degree: degree,
        };

        dispatch(updateUser(id, updateInput));
        handleClose();
        // setTimeout(() => {
        window.location.reload();
        // }, 3000);
    };
    const handleFollow = () => {
        let user_id = currentUser._id;
        dispatch(followUser({ user_id }, id));
    };
    return (
        <div className="profile">
            <SidebarLeft className="home-left" />
            <div className="profile-right">
                <div className="profile-right-top">
                    <div className="profile-pic-container">
                        <img
                            className="profile-pic"
                            src={user.profilePicture}
                            alt=""
                        />
                        <div className="profile-about">
                            <div className="username">
                                {user && user.first_name}{" "}
                                {user && user.last_name}
                            </div>
                            <div className="user-degree">{user.degree}</div>
                            <div className="about">{user.description}</div>
                        </div>
                        <div className="follow-btn">
                            {id !== currentUser._id ? (
                                // user.followers.includes(currentUser._id) ? (
                                //     <button onClick={handleFollow}>
                                //         UnFollow
                                //     </button>
                                // ) :
                                <button
                                    className="profileBtn"
                                    onClick={handleFollow}
                                >
                                    Follow
                                </button>
                            ) : (
                                <button
                                    className="profileBtn"
                                    onClick={() => setShow(true)}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="input-form">
                                <InputGroup>
                                    <InputGroup.Text>Biography</InputGroup.Text>
                                    <FormControl
                                        as="textarea"
                                        aria-label="With textarea"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>
                                        Institution
                                    </InputGroup.Text>
                                    <FormControl
                                        className="input-field"
                                        type="text"
                                        className="mr-sm-2"
                                        value={institution}
                                        onChange={(e) =>
                                            setInstitution(e.target.value)
                                        }
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>Location</InputGroup.Text>
                                    <FormControl
                                        className="input-field"
                                        type="text"
                                        className="mr-sm-2"
                                        value={location}
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>Position</InputGroup.Text>
                                    <FormControl
                                        className="input-field"
                                        type="text"
                                        className="mr-sm-2"
                                        value={position}
                                        onChange={(e) =>
                                            setPosition(e.target.value)
                                        }
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>Degree</InputGroup.Text>
                                    <FormControl
                                        className="input-field"
                                        type="text"
                                        className="mr-sm-2"
                                        value={degree}
                                        onChange={(e) =>
                                            setDegree(e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleEdit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="profile-right-bottom">
                    <UserTopics
                        className="userTopics"
                        user={user}
                        topics={topics}
                        setReloadA={setReloadA}
                        reloadA={reloadA}
                    />
                    {/* <Feed className="home-feed" /> */}

                    <SidebarRight className="home-right" profile />
                </div>
            </div>
        </div>
    );
};

export default Profile;
