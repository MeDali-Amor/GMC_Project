import React from "react";
import UserMin from "../UserMin/UserMin";
import "./SidebarRight.css";
const SidebarRight = ({ profile }) => {
    const homeRight = () => {
        <>
            <div className="right-followers">
                <UserMin />
                <UserMin />
                <UserMin />
                <UserMin />
                <UserMin />
                <UserMin />
                <UserMin />
                <UserMin />
            </div>
        </>;
        const profileRight = () => {
            <>
                <div className="infos">
                    <div className="affiliation">
                        <h4>Current affiliation</h4>
                        <div className="institut">blalkcsld</div>
                        <div className="location">somewhere</div>
                        <div className="position">position</div>
                    </div>
                </div>
            </>;
        };
    };
    return (
        <div className="side-right">
            <div className="right-wrapper">
                <div className="right-followers">
                    <UserMin />
                    <UserMin />
                    <UserMin />
                    <UserMin />
                    <UserMin />
                    <UserMin />
                    <UserMin />
                    <UserMin />
                </div>
            </div>
        </div>
    );
};

export default SidebarRight;
