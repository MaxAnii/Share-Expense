const pool = require("../config/db");
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query('SELECT * FROM "user" WHERE "id"=$1', [id]);
    if (data.rows.length !== 0) res.json(data.rows[0]);
    else res.json({ status: 400 });
  } catch (error) {
    console.log(error.message);
  }
};
const updateDetails = async (req, res) => {
  try {
    const { id, name, bio, image, email } = req.body;
    const data = await pool.query(
      'UPDATE "user" SET "name" =$1 ,"email"=$2,"image"=$3,"bio"=$4 WHERE "id"=$5 RETURNING *',
      [name, email, image, bio, id]
    );
    if (data.rows.length !== 0) {
      res.json({
        status: 200,
        message: "Information updated",
      });
    } else {
      res.json({
        status: 400,
        message: "An error has occurred",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const changePassword = async (req, res) => {
  try {
    const { id, newPassword } = req.body;
    const data = await pool.query(
      'UPDATE "user" SET "password"=$1 WHERE "id"=$2 RETURNING *',
      [newPassword, id]
    );
    if (data.rows.length !== 0) {
      res.json({
        status: 200,
        message: "Password updated",
      });
    } else {
      res.json({
        status: 400,
        message: "An error has occurred",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { updateDetails, getUserDetails, changePassword };
