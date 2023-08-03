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
    const reslut = await pool.query('SELECT * FROM "room" WHERE "adminid"=$1', [
      userid,
    ]);
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

module.exports = { addRoom, getRoom, getMemberList, sendRequest };
