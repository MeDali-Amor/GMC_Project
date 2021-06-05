import React, { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch } from "react-redux";
import UsersList from "../../Components/UserList/UsersList";
import { getAllUsers } from "../../Redux/actions/user";

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    return (
        <div className="dashboard">
            {/* <h1>Admin Dashboard</h1> */}
            <UsersList />
        </div>
    );
};

export default Dashboard;
