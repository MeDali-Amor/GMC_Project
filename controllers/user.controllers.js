const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

exports.Register = async (req, res) => {
    try {
        // req.body= first_name, last_name, email, password
        const { email, password, role } = req.body;
        //test email
        const findUser = await User.findOne({ email });
        //email should be unique
        if (findUser) {
            return res.status(400).send({
                errors: [{ msg: "this email address is already registered." }],
            });
        }
        // new user

        const newUser = await new User({ ...req.body });
        newUser.profilePicture = gravatar.url(email, {
            r: "pg",
            d: "mm",
            s: "200",
        });
        // hash password
        const hashedpassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedpassword;

        // save user
        await newUser.save();

        // create token
        const token = jwt.sign(
            {
                id: newUser._id,
                role: newUser.role,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        // response
        res.status(200).send({
            msg: "Registered successfuly",
            user: newUser,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "user is not saved" }] });
    }
};

exports.Login = async (req, res) => {
    try {
        //email and password
        const { email, password } = req.body;
        // query user by email
        const findUser = await User.findOne({ email });
        // if email is not registered
        if (!findUser) {
            return res.status(401).send({
                errors: [{ msg: "wrong email password combination" }],
            });
        }
        // password check
        const comparedpassword = await bcrypt.compare(
            password,
            findUser.password
        );
        // if password is wrong
        if (!comparedpassword) {
            return res.status(401).send({
                errors: [{ msg: "wrong email password combination" }],
            });
        }
        const token = jwt.sign(
            {
                id: findUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).send({
            msg: "login successfully",
            user: findUser,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            errors: [{ msg: "can not login" }],
        });
    }
};

// get all users
exports.ShowUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).send({ msg: "show all users", users: users });
    } catch (error) {
        res.status(500).send(error);
    }
};

// get user by id
exports.getUserById = async (req, res) => {
    try {
        // const userId = req.params.id;
        const user = await User.findById({ _id: req.params.id }).select(
            "-password"
        );
        if (!user) {
            return res.send({ msg: "user not found" });
        }
        res.status(200).send({ user: user });
    } catch (error) {
        res.status(500).send(error);
    }
};
// saerch user by name
exports.searchByName = async (req, res) => {
    try {
        const { searchInput } = { ...req.body };
        const users = await User.find().select("-password");
        const searchedUsers = users.filter(
            (user) =>
                user.first_name
                    .toString()
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(
                        searchInput.toString().toLowerCase().split(" ").join("")
                    ) ||
                user.last_name
                    .toString()
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(
                        searchInput.toString().toLowerCase().split(" ").join("")
                    )
        );
        // if (searchedUsers.length === 0) {
        //     return res.status(404).send({ msg: "no result is found" });
        // }
        return res.status(200).send(searchedUsers);
    } catch (error) {
        res.status(500).send(error);
    }
};
//update User
exports.updateUser = async (req, res) => {
    try {
        if (req.user.id == req.params.id || req.body.isAdmin) {
            const updateInput = { ...req.body };
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: updateInput }
            ).select("-password");
            await updatedUser.save();
            res.status(200).send({
                msg: "account updated successfuly",
                user: updatedUser,
            });
        } else
            return res.status(403).send({
                msg: "you can only modify your own account",
            });
    } catch (error) {
        res.status(500).send(error);
    }
};

// delete a user
exports.deleteUser = async (req, res) => {
    try {
        if (req.user.id == req.params.id || req.user.role == "admin") {
            const deletedUser = await User.findOneAndDelete(req.params.id);
            res.status(200).send({
                msg: "account deleted successefuly",
            });
        } else {
            return res.status(403).send("you can only delete your account");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
// follow user
exports.follow = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (user_id !== req.params.id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(user_id);
            if (!user.followers.includes(user_id)) {
                await user.updateOne({ $push: { followers: user_id } });
                await currentUser.updateOne({
                    $push: { following: req.params.id },
                });

                res.status(200).send({
                    msg: `now you are following ${user.first_name}`,
                    user,
                });
            } else {
                await user.updateOne({ $pull: { followers: user_id } });
                await currentUser.updateOne({
                    $pull: { following: req.params.id },
                });
                res.status(200).send({
                    msg: `you unfollowed ${user.first_name}`,
                    user,
                });
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// unfollow user
// exports.unfollow = async (req, res) => {
//     try {
//         if (req.user.id !== req.params.id) {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.user.id);
//             if (user.followers.includes(req.user.id)) {
//                 await user.updateOne({ $pull: { followers: req.user.id } });
//                 await currentUser.updateOne({
//                     $pull: { following: req.params.id },
//                 });
//                 res.status(200).send(`you unfollowed ${user.first_name}`);
//             } else {
//                 res.status(403).send(
//                     `you alrady don't follow ${user.first_name}`
//                 );
//             }
//         } else {
//             res.status(403).send("you can't unfollow yourself");
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };
