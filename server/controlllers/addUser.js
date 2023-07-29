const pool = require("../config/db");

const addGoogleGitUser = async (email, name, image) => {
  var user = await pool.query('SELECT * FROM "user" WHERE "email"=$1', [email]);
  if (user.rows.length == 0) {
    const password = "";
    const editFlag = false;
    user = await pool.query(
      'INSERT INTO "user" VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [name, email, password, image, editFlag]
    );
  }
  return user.rows[0];
};
const addNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  var user = await pool.query('SELECT * FROM "user" WHERE "email"=$1', [email]);
  if (user.rows.length != 0) {
    res.json({
      status: 404,
      message: "Email already registered",
    });
  } else {
    const defaultImage =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgn8b-nQ_xNyOoSV5KV-DXINTAqg-Niov6sw";
    const editFlag = true;
    user = await pool.query(
      'INSERT INTO "user" VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [name, email, password, defaultImage, editFlag]
    );
    res.json({
      status: 200,
    });
  }
};
module.exports = { addGoogleGitUser, addNewUser };
