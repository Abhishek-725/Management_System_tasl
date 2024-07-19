const { Op } = require('sequelize');
const Department = require('../models/departmentModel');
const errorWrapper = require('../utils/errorWrapper');


exports.createDepartMent = errorWrapper(async (req,res,next) => {
    const {department_code, name} = req.body;
    await Department.create({
        department_id : department_code,
        name
    });
    res.status(201).json({message:'Department inserted successfully'});
});


exports.getDepartMents = errorWrapper(async (req,res,next) => {
    const {code , name} = req.query;
    const whereClause = {};
    if (name) whereClause['name'] = {[Op.like] : `%${name}%`};
    if (code) whereClause['department_id'] = {[Op.like] : `%${code}%`};
    const data = await Department.findAll({
        where : whereClause
    });
    res.status(200).json({
        data,
        success : true
    });
})

