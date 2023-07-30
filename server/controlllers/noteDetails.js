const pool = require("../config/db");
const postgresDateFormate = () => {
  const date = new Date().toLocaleDateString();
  const dateArray = date.split("/");
  const year = dateArray[2];
  const month = dateArray[1];
  const day = dateArray[0];
  return (sqlDate = year + "-" + day + "-" + month);
};

const addNote = async (req, res) => {
  try {
    const { id, name, roomid, adminid } = req.body;
    const date = postgresDateFormate();
    console.log(req.body);
    console.log(date);
    const result = await pool.query(
      'INSERT INTO "note" VALUES($1,$2,$3,$4,$5) RETURNING *',
      [id, name, roomid, adminid, date]
    );
    if (result.rows.length !== 0)
      res.json({
        status: 200,
        message: "Note created.",
      });
    else
      res.status(400).json({
        message: "Error in creating note.",
      });
  } catch (error) {
    console.log(error.message);
  }
};

const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const reslut = await pool.query('SELECT * FROM "note" WHERE "roomid"=$1', [
      id,
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
module.exports = { addNote, getNote };
