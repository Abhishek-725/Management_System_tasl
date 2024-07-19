const Departments = require("../models/departmentModel");
const Employee = require("../models/employeeModel");
const EmployeeProjectTrack = require("../models/employeeProjectTrack");
const errorWrapper = require("../utils/errorWrapper");
const moment = require("moment");

exports.createEmpProjectTrack = errorWrapper(async (req, res, next) => {
  const { project_id, employee_id, joined, exit } = req.body;
  await EmployeeProjectTrack.create({
    project_id,
    employee_id,
    joined,
    exit,
  });
  res.status(201).json({ message: "Employee inserted successfully" });
});

exports.getEmpProjectTrackDetails = errorWrapper(async (req, res, next) => {
    const data = await EmployeeProjectTrack.findAll();
    if (!data || data.length == 0 )
        return res.status(400).json({message : 'No data found.'})
    res.status(200).json({
        data,
        success : true
    })
});
