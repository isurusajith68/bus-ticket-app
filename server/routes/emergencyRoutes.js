const express = require("express");
const router = express.Router();
const emergencyController = require("../controllers/emergencyController");

router.post("/", emergencyController.storeEmergencyDetails);

module.exports = router;
