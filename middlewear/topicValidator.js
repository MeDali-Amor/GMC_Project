const { validationResult, check } = require("express-validator");

exports.commentValidator = () => [
    check("commentInput", "comment is empty").notEmpty(),
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
