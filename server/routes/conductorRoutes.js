const express = require("express");
const router = express.Router();
const conductorController = require("../controllers/conductorController");

router.get("/:conductorId", conductorController.getConductor);
router.put("/:conductorId", conductorController.updateConductor);

module.exports = router;
