import React, { useState } from "react";
import "./Share.css";
import { PhotoLibrary, PictureAsPdf } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { createTopic } from "../../Redux/actions/topic";
const Share = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        title: "",
        authors: "",
        field: "",
        textContent: "",
        img: "",
    });
    const { title, authors, field, textContent, img } = values;
    const handleSubmit = (e) => {
        e.preventDefault();
        let topicData = new FormData();
        topicData.append("title", values.title);
        topicData.append("authors", values.authors);
        topicData.append("field", values.field);
        topicData.append("textContent", values.textContent);
        img && topicData.append("img", values.img);

        console.log([...topicData]);

        dispatch(createTopic(topicData));
        setValues("");
    };
    const handleImgChange = (e) => {
        setValues({ ...values, img: e.target.files[0] });
    };
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <div className="share">
            <div className="share-wrapper">
                <div className="shareTitle">Share your work</div>
                <form onSubmit={handleSubmit}>
                    <div className="share-top">
                        {/* <img
                            src="/assets/121354415_4149118058448670_6069534839292294759_n.jpg"
                            alt=""
                            className="user-pic"
                        /> */}
                        <input
                            type="text"
                            placeholder="title"
                            className="title-input"
                            name="title"
                            onChange={handleChange}
                            value={title}
                        />
                        <span className="inlineInput">
                            <input
                                type="text"
                                placeholder="Authors"
                                className="authors-input"
                                name="authors"
                                onChange={handleChange}
                                value={authors}
                            />
                            <input
                                type="text"
                                placeholder="field"
                                className="field-input"
                                name="field"
                                onChange={handleChange}
                                value={field}
                            />
                        </span>
                        <textarea
                            placeholder="Abstract"
                            className="abstract-input"
                            name="textContent"
                            onChange={handleChange}
                            value={textContent}
                        />
                    </div>
                    {/* <hr className="share-hr" /> */}
                    <div className="share-bottom">
                        <label htmlFor="file" className="picShare">
                            <PictureAsPdf className="share-icon" />
                            <div>File</div>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                name="img"
                                id="file"
                                onChange={handleImgChange}
                            />
                        </label>
                        <div className="fileShare">
                            <PhotoLibrary className="share-icon" />
                            <div>Photo</div>
                        </div>
                        <button className="share-btn" type="submit">
                            Share
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Share;
