const express = require("express");
const router = express.Router();
const controller = require("../controller/departMentController");
const validations = require("../utils/validations/departmentValidation");
const validator = require("../middleware/validator");

router
  .route("/")
  .post(validations.departMentValidation, validator, controller.createDepartMent)
  .get(controller.getDepartMents);

module.exports = router;
