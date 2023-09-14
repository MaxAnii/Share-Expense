const pool = require("../config/db");

const updateDetails = async (req, res) => {
  try {
    const { id, name, bio, image, email } = req.body;
    console.log(id, name, bio, image, email);
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
module.exports = updateDetails;
