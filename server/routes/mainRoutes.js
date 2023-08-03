const express = require("express");
const router = express.Router();

const {
  addRoom,
  getRoom,
  getMemberList,
  sendRequest,
} = require("../controlllers/roomDetails");
const { addNote, getNote } = require("../controlllers/noteDetails");
const { addExpense, getExpense } = require("../controlllers/expenseDetails");
router.post("/addroom", addRoom);
router.get("/getroom/:userid", getRoom);
router.post("/addnote", addNote);
router.get("/getnote/:roomid", getNote);
router.post("/addexpense", addExpense);
router.get("/getexpense/:noteid", getExpense);
router.get("/getmember/:username", getMemberList);
router.post("/sendrequest", sendRequest);
module.exports = router;
