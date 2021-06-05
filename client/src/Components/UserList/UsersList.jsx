import React from "react";
import "./UserList.css";
import { useSelector } from "react-redux";
import UserCard from "../UserCard/UserCard";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../Redux/actions/user";
const UsersList = () => {
    const users = useSelector((state) => state.userReducer.users);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="user-list">
                <div className="card-container">
                    <div className="user-name-email">
                        <div className="user-name">Name</div>
                    </div>

                    <div className="user-coord">Position</div>
                    <div className="user-coord">Location</div>
                </div>
                <hr />
                {users.map((user) => (
                    <UserCard user={user} key={user._id} />
                ))}
            </div>
        </div>
    );
};

export default UsersList;
