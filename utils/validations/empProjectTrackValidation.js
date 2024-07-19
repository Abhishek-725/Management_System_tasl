const { check, validationResult } = require('express-validator');
const moment = require('moment');
const Project = require('../../models/projectModel');
const Employee = require('../../models/employeeModel');

exports.projectEmployeeValidation = [
    check('project_id')
        .trim()
        .notEmpty()
        .withMessage('Project ID is required.')
        .isString()
        .withMessage('Project ID must be a string.')
        .isLength({ min: 7, max: 7 })
        .withMessage('Project ID must be exactly 7 characters long.')
        .custom(async (value) => {
            const project = await Project.findOne({ where: { project_id: value } });
            if (!project) {
                throw new Error('Project ID does not exist.');
            }
            return true;
        }),

    check('employee_id')
        .trim()
        .notEmpty()
        .withMessage('Employee ID is required.')
        .isString()
        .withMessage('Employee ID must be a string.')
        .isLength({ min: 6, max: 6 })
        .withMessage('Employee ID must be exactly 7 characters long.')
        .custom(async (value) => {
            const employee = await Employee.findOne({ where: { employee_id: value } });
            if (!employee) {
                throw new Error('Employee ID does not exist.');
            }
            return true;
        }),

    check('joined')
        .isDate()
        .withMessage('Joined date must be a valid date.')
        .custom(value => {
            const joinedDate = moment(value, 'YYYY-MM-DD');
            const currentDate = moment().endOf('day');
            if (joinedDate.isAfter(currentDate, 'day')) {
                throw new Error('Joined date cannot be in the future.');
            }
            return true;
        }),

    check('exit')
        .isDate()
        .withMessage('Exit date must be a valid date.')
        .custom((value, { req }) => {
            const exitDate = moment(value, 'YYYY-MM-DD');
            const joinedDate = moment(req.body.joined, 'YYYY-MM-DD').endOf('day');
            if (exitDate.isBefore(joinedDate, 'day')) {
                throw new Error('Exit date cannot be before the joined date.');
            }
            return true;
        })
];

