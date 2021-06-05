const mongoose = require("mongoose");

const { Schema } = mongoose;
const topicSchema = new Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        authors: {
            type: String,
        },
        field: { type: String },
        textContent: {
            type: String,
        },
        img: {
            data: Buffer,
            contentType: String,
        },
        recommends: [],
        comments: [
            {
                commentBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                name: {
                    type: String,
                    // required: true,
                },
                avatar: {
                    type: String,
                    // required: true,
                },
                content: { type: String, required: true },
                recommends: {
                    type: Number,
                    default: 0,
                },
            },
            { timestamps: true },
        ],
    },
    { timestamps: true }
);

module.exports = Topic = mongoose.model("Topic", topicSchema);
