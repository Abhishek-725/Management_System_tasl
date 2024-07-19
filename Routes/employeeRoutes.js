const express = require("express");
const router = express.Router();
const controller = require("../controller/employeeController");
const validations = require("../utils/validations/employeeValidation");
const validator = require("../middleware/validator");

router
  .route("/")
  .post(validations.employeeValidation, validator, controller.createEmployee)
  .get(controller.getEmployee)
  .delete(validations.checkEmpId, validator, controller.deleteEmployee);

router
  .route('/dept-avg')
  .get(controller.getAvgAge);

module.exports = router;
