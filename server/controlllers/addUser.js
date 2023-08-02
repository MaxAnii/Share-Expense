const pool = require("../config/db");
const { v4 } = require("uuid");
const addGoogleGitUser = async (email, name, image) => {
  var result = await pool.query('SELECT * FROM "user" WHERE "email"=$1', [
    email,
  ]);
  if (result.rows.length == 0) {
    const password = "";
    const editFlag = false;
    const id = v4();
    result = await pool.query(
      'INSERT INTO "user" VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, email, password, image, editFlag, id]
    );
  }
  const user = {
    id: result.rows[0].id,
    email: result.rows[0].email,
    name: result.rows[0].name,
    image: result.rows[0].image,
    editFlag: result.rows[0].editFlag,
  };
  return user;
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
    const id = v4();
    user = await pool.query(
      'INSERT INTO "user" VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, email, password, defaultImage, editFlag, id]
    );
    res.json({
      status: 200,
    });
  }
};
module.exports = { addGoogleGitUser, addNewUser };
