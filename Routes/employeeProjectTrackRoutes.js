const express = require("express");
const router = express.Router();
const controller = require("../controller/employeeProjectTrack");
const validations = require("../utils/validations/empProjectTrackValidation");
const validator = require("../middleware/validator");

router
  .route("/")
  .post(validations.projectEmployeeValidation, validator, controller.createEmpProjectTrack)
  .get(controller.getEmpProjectTrackDetails);

module.exports = router;
