const pool = require("../config/db");

const addRoom = async (req, res) => {
  try {
    const { id, name, desc, adminId } = req.body;
    const result = await pool.query(
      'INSERT INTO "room" VALUES ($1,$2,$3,$4) RETURNING *',
      [id, name, desc, adminId]
    );
    if (result.rows.length !== 0) res.status(200).json(result.rows[0]);
    else res.status(400);
  } catch (error) {
    console.log(error.message);
  }
};

const getRoom = async (req, res) => {
  try {
    const { userid } = req.params;
    const status = true;
    const reslut = await pool.query(
      'SELECT "id","name","description","adminid" FROM "room" WHERE "adminid"=$1 UNION SELECT  "id","name","description","adminid" FROM "room","roomMember" WHERE "id"="roomid" AND "memberid"=$2 AND "status"=$3',
      [userid, userid, status]
    );
    if (reslut.rows.length !== 0) {
      res.json(reslut.rows);
    } else {
      res.status(400);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getMemberList = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const result = await pool.query(
      'SELECT "id","name","image" FROM "user" WHERE "name"=$1',
      [username]
    );
    if (result.rows.length !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.json({
        status: 400,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const sendRequest = async (req, res) => {
  try {
    console.log(req.body);
    const { roomid, userid } = req.body;
    const status = false;
    let result;
    result = await pool.query(
      'SELECT * FROM "roomMember" WHERE "roomid"=$1 AND "memberid"=$2 AND "status"=$3',
      [roomid, userid, status]
    );
    if (result.rows.length === 0) {
      result = await pool.query(
        'INSERT INTO "roomMember" VALUES($1,$2,$3) RETURNING *',
        [roomid, userid, status]
      );
      if (result.rows.length !== 0) {
        res.json({
          status: 200,
          message: "Request sent",
        });
      } else {
        res.json({
          status: 400,
          message: "Error try again",
        });
      }
    } else {
      if (!result.rows[0].status)
        res.json({
          status: 400,
          message: "Request already sent",
        });
      else {
        res.json({
          status: 400,
          message: "Already Room Member",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const ListRoomRequest = async (req, res) => {
  const { userid } = req.params;
  const status = false;
  try {
    const result = await pool.query(
      'SELECT "name","description","memberid","roomid" FROM "room","roomMember" WHERE "roomid"="id" AND "status"=$1 AND "memberid"=$2',
      [status, userid]
    );
    if (result.rows.length !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.json({
        status: 400,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const acceptRequest = async (req, res) => {
  try {
    console.log("hhi");
    const status = true;
    const { roomid, userid } = req.body;
    const result = await pool.query(
      'UPDATE "roomMember" SET "status"=$1 WHERE "roomid"=$2 AND "memberid"=$3 RETURNING *',
      [status, roomid, userid]
    );
    console.log(result.rows[0]);
    if (result.rows.length !== 0) {
      res.json({
        status: 200,
      });
    } else {
      res.json({
        status: 400,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const rejectRequest = async (req, res) => {
  try {
    const { roomid, userid } = req.body;
    const result = await pool.query(
      'DELETE FROM "roomMember" WHERE "roomid"=$2 AND "userid"=$3 RETURNING *',
      [roomid, userid]
    );
    if (result.rows.length !== 0) {
      res.json({
        status: 200,
      });
    } else {
      res.json({
        status: 400,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addRoom,
  getRoom,
  getMemberList,
  sendRequest,
  ListRoomRequest,
  acceptRequest,
  rejectRequest,
};
