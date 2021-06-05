import React from "react";
import "./UserCard.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../Redux/actions/user";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        const id = user._id;
        dispatch(deleteUser(id));
        window.location.reload();
    };
    return (
        <>
            <div className="card-container">
                <img src={user.profilePicture} alt="" className="user-avatar" />

                <div className="user-name-email">
                    <div className="user-name">
                        <Link
                            exact
                            className="user-link"
                            to={`/profile/${user._id}`}
                        >
                            <span className="user-info">{user.first_name}</span>{" "}
                            <span className="user-info">{user.last_name}</span>
                        </Link>
                    </div>
                    <div className="user-email">{user.email}</div>
                </div>

                <div className="user-info">{user.position}</div>
                <div className="user-info">{user.establishement}</div>
                <button className="dlt-btn" onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <hr />
        </>
    );
};

export default UserCard;
