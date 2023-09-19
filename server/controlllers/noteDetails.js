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
    const { roomid } = req.params;
    const reslut = await pool.query(
      'SELECT "note"."id", "note"."name" as "noteName","roomid","adminid","creationdate","user"."name" FROM "note","user" WHERE "roomid"=$1 AND "adminid"="user"."id" ORDER BY "creationdate","note"."name" ASC',
      [roomid]
    );
    if (reslut.rows.length !== 0) {
      res.status(200).json(reslut.rows);
    } else {
      res.status(400).json({
        message: "Error in fetching notes",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const deleteNote = async (req, res) => {
  try {
    const { noteid } = req.params;

    let result = await pool.query(
      'DELETE FROM "expense" WHERE "noteid"=$1 RETURNING *',
      [noteid]
    );
    result = await pool.query('DELETE FROM "note" WHERE "id"=$1 RETURNING *', [
      noteid,
    ]);

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
module.exports = { addNote, getNote, postgresDateFormate, deleteNote };
