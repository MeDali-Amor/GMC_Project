import React from "react";
import "./SidebarLeft.css";
import { Link } from "react-router-dom";
import { Ballot, Description, QuestionAnswer } from "@material-ui/icons";
const SidebarLeft = () => {
    return (
        <div className="side-left">
            <div className="left-wrapper">
                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <Ballot />
                        <div className="Sidelink">
                            <Link to="/home" className="feedlink">
                                Feed
                            </Link>
                        </div>
                    </li>
                    <li className="sidebar-item">
                        <Description />

                        <div className="Sidelink">
                            <Link to="/publications" className="feedlink">
                                Publications
                            </Link>
                        </div>
                    </li>
                    <li className="sidebar-item">
                        <QuestionAnswer />
                        <div className="Sidelink">Questions</div>
                    </li>
                    <li className="sidebar-item"></li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarLeft;
