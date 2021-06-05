import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import Feed from "../../Components/Feed/Feed";
import SidebarLeft from "../../Components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../Components/SidebarRight/SidebarRight";
import Dashboard from "../Dashboard/Dashboard";
// import { Dashboard } from "@material-ui/icons";

const Home = () => {
    const currentUser = useSelector((state) => state.userReducer.user);
    return (
        <div className="home-container">
            {currentUser.role == "admin" ? (
                <Dashboard />
            ) : (
                <>
                    <SidebarLeft className="home-left" />
                    <Feed className="home-feed" />
                    <SidebarRight className="home-right" />{" "}
                </>
            )}
        </div>
    );
};

export default Home;
