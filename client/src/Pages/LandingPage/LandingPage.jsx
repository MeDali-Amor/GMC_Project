import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="landingContainer">
            <div className="fisrtSection">
                <div className="fsectionLeft">
                    <div className="fsectionText">
                        Share your scientific knowledge and discover the latest
                        publications from your peers
                    </div>
                    <div className="fsectionButton">
                        <Link to="/publications">
                            <button className="landBtn">
                                See the latest publications
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="fsectionRight">
                    <img
                        src="/assets/undraw_science_fqhl.png"
                        alt=""
                        className="hero"
                    />
                </div>
            </div>
            <div className="secondSection">
                <div className="ssectionText">
                    Join the Tunisia research community and stay connected to
                    the world of science.
                </div>
                <div className="fsectionButton">
                    <Link to="/register">
                        <button className="landBtn">Join now</button>
                    </Link>
                </div>
            </div>
            <div className="footer">
                <hr />© 2021 Tuni-Scie All rights reserved.
            </div>
        </div>
    );
};

export default LandingPage;
