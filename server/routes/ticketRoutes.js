const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.post("/", ticketController.generateTicket);
router.get("/:ticketCode", ticketController.getTicket);

module.exports = router;
