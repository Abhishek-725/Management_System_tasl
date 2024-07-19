const express = require('express');
const router = express.Router();

const departMentRoutes = require('./departmentRoutes');
const employeeRoutes = require('./employeeRoutes');
const empProjectTrackRoutes = require('./employeeProjectTrackRoutes');
const filesRoutes = require('./fileRoutes');

router.use('/departments',departMentRoutes);
router.use('/employees',employeeRoutes);
router.use('/emp-projectTrack',empProjectTrackRoutes);
router.use('/files',filesRoutes)

module.exports = router;