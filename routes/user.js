const express = require("express");
const {
    Register,
    Login,
    ShowUsers,
    getUserById,
    searchByName,
    updateUser,
    deleteUser,
    follow,
    unfollow,
} = require("../controllers/user.controllers");
const isAuth = require("../middlewear/isAuth");
const {
    validation,
    registerValidator,
    loginValidator,
} = require("../middlewear/userValidator");
const { searchValidator } = require("../middlewear/searchValidator");
const router = express.Router();

/*
@method: POST
@ path:http: localhost:5000/api/user/register
@ parameter: req.body
public
*/
router.post("/register", registerValidator(), validation, Register);
/*
@method: POST
@ path:http: localhost:5000/api/user/login
@ parameter: req.body
public
*/
router.post("/login", loginValidator(), validation, Login);

/*
@method: GET
@ path:http: localhost:5000/api/user/current
@ parameter: req.headers
public
*/
router.get("/current", isAuth, (req, res) => {
    res.send({ msg: "autorized", user: req.user });
});

// get all users
/*
@method: GET
@ path:http: localhost:5000/api/user/users
public
*/
router.get("/users", ShowUsers);

// get user by id
/*
@method: GET
@ path:http: localhost:5000/api/user/:id
@ parameter: req.params
public
*/
router.get("/profile/:id", getUserById);

// search user by name
router.put("/search_name", searchValidator(), validation, searchByName);
// update user
router.put("/update/:id", isAuth, updateUser);
// delete a user
router.delete("/delete/:id", isAuth, deleteUser);
//follow a user
router.put("/follow/:id", isAuth, follow);
// unfollow user
// router.put("/unfollow/:id", isAuth, unfollow);

module.exports = router;
