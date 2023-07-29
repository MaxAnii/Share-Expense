const express = require("express");
const router = express.Router();

const { addRoom, getRoom } = require("../controlllers/roomDetails");
router.post("/addroom", addRoom);
router.get("/getroom/:id", getRoom);
module.exports = router;
