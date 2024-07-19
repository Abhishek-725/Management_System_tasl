const { Op, Sequelize } = require('sequelize');
const Departments = require('../models/departmentModel');
const Employee = require('../models/employeeModel');
const errorWrapper = require('../utils/errorWrapper');
const moment = require('moment');
const EmployeeProjectTrack = require('../models/employeeProjectTrack');
const Project = require('../models/projectModel');

exports.createEmployee = errorWrapper(async (req, res, next) => {
  const { first_name, last_name, department_id, onboard_date, age } = req.body;
  await Employee.create({
    first_name,
    last_name,
    department_id,
    onboard_date : moment.utc(moment(onboard_date).format()),
    age,
  });
  res.status(201).json({ message: "Employee inserted successfully" });
});

exports.getEmployee = errorWrapper(async (req,res,next) => {
    const {emp_id, department_id, project_id, searchquery} = req.query;
    const empWhereClause = {};
    const departmentWhereClause = {};
    const projectWhereClause = {};
    if (searchquery) {
      empWhereClause['employee_id'] = {[Op.like] : `%${searchquery}%`};
      departmentWhereClause['name'] = {[Op.like] : `%${searchquery}%`};
      projectWhereClause['name'] = {[Op.like] : `%${searchquery}%`};
    }
    if (emp_id) empWhereClause['employee_id'] = emp_id;
    if (department_id) departmentWhereClause['department_id'] = department_id;
    if (project_id) projectWhereClause['project_id'] = project_id;

    const data = await Employee.findAll({
      include : [
        {
          model : Departments,
          where : departmentWhereClause,
          attributes : [],
          as : 'department'
        },
        {
          model : EmployeeProjectTrack,
          where : { },
          attributes : [

          ],
          as : 'employeeProjectTracks',
          include : [
            {
              model : Project,
              where : projectWhereClause,
              as : 'project',
             attributes : [
              'project_id',
              'name'
             ] 
            }
          ],
          order: [['joined', 'DESC']]
        }
      ],
    where : {is_deleted:'0', ...empWhereClause},
    attributes : [
      'id',
      'employee_id',
      'first_name',
      'last_name',
      'department_id',
      'onboard_date',
      'age',
      [Sequelize.col('department.name'),'department_name'],
      [Sequelize.col('employeeProjectTracks.project.project_id'),'project_id'],
      [Sequelize.col('employeeProjectTracks.project.name'),'project_name'],
      [Sequelize.col('employeeProjectTracks.joined'),'joined'],
      [Sequelize.col('employeeProjectTracks.exit'),'exit']
    ],
    logging : true
    });

    if (!data || data.length == 0) {
        return res.status(400).json({message : 'No data found.'});
    }
    res.status(201).json({
      data,
      success : true
    });
});


exports.deleteEmployee = errorWrapper( async (req,res,next) => {
  const {employee_id} = req.query;
  await Employee.update({
    is_deleted : '1'
  },{
    where : {employee_id : employee_id}
  });
  res.status(200).json({message : 'Employee deleted successfully.'})
})

exports.getAvgAge = errorWrapper(async (req, res, next) => {
  const data = await Departments.findAll({
    include: [
      {
        model: Employee,
        attributes: [],
        as: "employees",
        where: { is_deleted: "0" },
        required : false
      },
    ],
    attributes: [
      "department_id",
      "name",
      [Sequelize.fn("AVG", Sequelize.col("age")), "avg_age"],
    ],
    group: ["department_id"],
    logging: true,
  });
  res.status(201).json({
    data,
    success: true,
  });
});

