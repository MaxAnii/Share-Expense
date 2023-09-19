const express = require("express");
const router = express.Router();

const {
  addRoom,
  getRoom,
  getMemberList,
  sendRequest,
  ListRoomRequest,
  acceptRequest,
  rejectRequest,
  leaveRoom,
  DeleteRoom,
  getRoomMemberList,
} = require("../controlllers/roomDetails");
const { addNote, getNote } = require("../controlllers/noteDetails");
const {
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require("../controlllers/expenseDetails");
const {
  updateDetails,
  getUserDetails,
  changePassword,
} = require("../controlllers/UpdateUserDetails");
router.post("/addroom", addRoom);
router.get("/getroom/:userid", getRoom);
router.get("/roommemberlist/:roomid", getRoomMemberList);
router.post("/addnote", addNote);
router.get("/getnote/:roomid", getNote);
router.post("/addexpense", addExpense);
router.get("/getexpense/:noteid/:fromdate/:todate", getExpense);
router.get("/getmember/:username", getMemberList);
router.post("/sendrequest", sendRequest);
router.get("/roomrequest/:userid", ListRoomRequest);
router.put("/acceptrequest", acceptRequest);
router.delete("/rejectrequest", rejectRequest);
router.delete("/deleteexpense/:noteid/:expenseid", deleteExpense);
router.put("/updateexpense", updateExpense);
router.delete("/leaveroom", leaveRoom);
router.delete("/deleteroom", DeleteRoom);
router.get("/getuserdetails/:id", getUserDetails);
router.put("/updatedetails", updateDetails);
router.put("/updatepassword", changePassword);
module.exports = router;
