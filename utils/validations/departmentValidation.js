const { check, validationResult } = require('express-validator');
const moment = require('moment'); // For date comparison
const Department = require('../../models/departmentModel');

exports.departMentValidation = [
    check('department_code')
        .trim()
        .notEmpty()
        .withMessage('Department code is required.'),

    check('name')
        .trim()
        .notEmpty()
        .withMessage('Department name is required.')
        .isString()
        .withMessage('Department name must be a string.'),
];


