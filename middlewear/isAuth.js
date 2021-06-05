const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {
        // import token
        const token = req.headers["authorization"];
        // if token doesn't exist
        if (!token) {
            return res
                .status(401)
                .send({ errors: [{ msg: "you are not authorized1" }] });
        }
        // text if token is valid
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            return res
                .status(401)
                .send({ errors: [{ msg: "you are not authorized2" }] });
        }
        // user verified
        req.user = user;
        // next
        next();
    } catch (error) {
        res.status(401).send({ errors: [{ msg: "you are not authorized" }] });
    }
};

module.exports = isAuth;
