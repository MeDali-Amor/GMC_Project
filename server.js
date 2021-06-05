const express = require("express");
const connectDB = require("./config/connectDB");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const app = express();

require("dotenv").config();

connectDB();
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).send("file uploaded successefully");
    } catch (error) {
        console.error(error);
    }
});

//routes
app.use("/api/user", require("./routes/user"));
app.use("/api/topic", require("./routes/topic"));

// app.get("/", (req, res) => {
//     res.send("this is a new mern project");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
    err ? console.error(err) : console.log(`server is running on port ${PORT}`)
);
console.clear();
