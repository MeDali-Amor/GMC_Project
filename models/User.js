const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        profilePicture: {
            type: String,
        },
        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        description: {
            type: String,
        },
        establishement: {
            type: String,
            max: 50,
        },
        location: {
            type: String,
        },
        position: {
            type: String,
            max: 50,
        },
        degree: {
            type: String,
            max: 50,
        },
        role: {
            type: String,
            default: "subscriber",
        },
    },
    { timestamps: true }
);

module.exports = User = mongoose.model("User", userSchema);
