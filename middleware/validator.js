const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            data: {
                message: errors.errors[0].msg
            },
            statusCode: 400
        })
    } else {
        next();
    }
};