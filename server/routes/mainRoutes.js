const express = require("express");
const router = express.Router();

const addRoom = require("../controlllers/roomDetails");
router.post("/addroom", addRoom);

module.exports = router;
