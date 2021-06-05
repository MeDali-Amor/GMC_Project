import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import { logout, searchUsers } from "../../Redux/actions/user";
import {
    Search,
    AccountCircle,
    Notifications,
    AddCircleOutline,
} from "@material-ui/icons";
import { searchTopics } from "../../Redux/actions/topic";

const Navbar = () => {
    const [searchInput, setSearchInput] = useState("");
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    let history = useHistory();
    const handleClick = () => {
        dispatch(logout());
    };

    const submitHandler = (e) => {
        if (searchInput !== "") {
            e.preventDefault();
            dispatch(searchUsers({ searchInput }));
            dispatch(searchTopics({ searchInput }));
            history.push("/search_result");
            setSearchInput("");
        } else e.preventDefault();
    };
    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <Link to="/" className="link">
                    <h1 className="logo">Tuni-Scie</h1>
                </Link>
            </div>
            <div className="navbar-center">
                <div className="searchbar">
                    <form className="search-input" onSubmit={submitHandler}>
                        <input
                            type="text"
                            className="search-input"
                            value={searchInput}
                            placeholder="Looking for something?"
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </form>
                    <Search className="search-icon" />
                </div>
            </div>
            <div className="navbar-right">
                {isAuth ? (
                    <>
                        <button className="nav-btn">
                            <Link to="/home" className="link">
                                Home
                            </Link>
                        </button>
                        <Link to={`profile/${user._id}`}>
                            <AccountCircle />
                        </Link>
                        <AddCircleOutline />
                        <Notifications />
                        {/* <button className="logout-btn">
                            <Link to="/admin_dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </button> */}
                        <button className="nav-btn">
                            <Link to="/" className="link" onClick={handleClick}>
                                Logout
                            </Link>
                        </button>
                    </>
                ) : (
                    <>
                        <button className="nav-btn">
                            <Link to="/register" className="link">
                                Register
                            </Link>
                        </button>
                        <button className="nav-btn">
                            <Link to="/login" className="link">
                                Login
                            </Link>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
