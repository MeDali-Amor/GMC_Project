const { validationResult, check } = require("express-validator");

exports.registerValidator = () => [
    check("first_name", "First name is required").notEmpty(),
    check("last_name", "Last name is required").notEmpty(),
    check("email", "It should be an eamil").isEmail(),
    check("password", "enter password").notEmpty(),
    check("password", "enter a valid password: 6 characters or more").isLength({
        min: 6,
    }),
];

exports.loginValidator = () => [
    check("email", "should be eamil").isEmail(),
    check("password", "enter a valid password").isLength({ min: 6 }),
];

// exports.updateValidator = () => [
//     check("updateInput", "input is empty").notEmpty(),
// ];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
