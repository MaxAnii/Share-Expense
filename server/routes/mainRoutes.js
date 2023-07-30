const express = require("express");
const router = express.Router();

const { addRoom, getRoom } = require("../controlllers/roomDetails");
const { addNote, getNote } = require("../controlllers/noteDetails");
const { addExpense, getExpense } = require("../controlllers/expenseDetails");
router.post("/addroom", addRoom);
router.get("/getroom/:id", getRoom);
router.post("/addnote", addNote);
router.get("/getnote/:id", getNote);
router.post("/addexpense", addExpense);
router.get("/getexpense/:noteid", getExpense);
module.exports = router;
