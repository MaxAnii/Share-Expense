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

module.exports = { addRoom, getRoom };
