const { check, validationResult } = require('express-validator');
const moment = require('moment'); // For date comparison
const Department = require('../../models/departmentModel');
const Employee = require('../../models/employeeModel');

exports.employeeValidation = [
    check('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name is required.')
        .isString()
        .withMessage('First name must be a string.')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters long.'),
    
    check('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is required.')
        .isString()
        .withMessage('Last name must be a string.')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters long.'),
    
    check('age')
        .isInt({ min: 20, max : 50 })
        .withMessage('Age must be between 20 to 50'),

    check('department_id')
        .isInt()
        .withMessage('Department ID must be a number.')
        .custom(async (value) => {
            const checkDepartMent = await checkDepartmentId(value);
            if (checkDepartMent.error) {
                throw new Error(checkDepartMent.message || '' )
            }
            return true;
        }),

    check('onboard_date')
        .isDate()
        .withMessage('Onboard date must be a valid date.')
        .custom(value => {
            const onboardDate = moment(value,'YYYY-MM-DD');
            const currentDate = moment();
            if (onboardDate.isBefore(currentDate, 'day')) {
                throw new Error('Onboard date must not be in the past.');
            }
            return true;
        })
];


const checkDepartmentId = async (id) => {
    try {
        const data = await Department.findOne({
            where : {id : id}
        });
        if (!data) return {error : true, message : 'Department id not fount.'};
        return {error : false};
    } catch (error) {
        return {error : true, message : error.message || 'Department fetch error'};
    }
}

exports.checkEmpId = [
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
]

