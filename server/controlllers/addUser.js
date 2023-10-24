const pool = require("../config/db");
const { v4 } = require("uuid");
const addGoogleGitUser = async (email, name, image, editFlag) => {
  try {
    var result = await pool.query('SELECT * FROM "user" WHERE "email"=$1', [
      email,
    ]);
    if (result.rows.length == 0) {
      const password = "";
      const id = v4();
      const bio =
        "Together, we can master the art of cost-sharing and enjoy life's pleasures without the financial stress.";
      result = await pool.query(
        'INSERT INTO "user" VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [name, email, password, image, editFlag, id, bio]
      );
    }
    const user = {
      id: result.rows[0].id,
      email: result.rows[0].email,
      name: result.rows[0].name,
      image: result.rows[0].image,
      editFlag: result.rows[0].editFlag,
      bio: result.rows.bio,
    };
    return user;
  } catch (error) {
    console.log(error.message);
  }
};
const addNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    var user = await pool.query('SELECT * FROM "user" WHERE "email"=$1', [
      email,
    ]);
    if (user.rows.length != 0) {
      res.json({
        status: 404,
        message: "Email already registered",
      });
    } else {
      const defaultImage =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgn8b-nQ_xNyOoSV5KV-DXINTAqg-Niov6sw";
      const editFlag = "editable";
      const id = v4();
      const bio =
        "Together, we can master the art of cost-sharing and enjoy life's pleasures without the financial stress.";
      user = await pool.query(
        'INSERT INTO "user" VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [name, email, password, defaultImage, editFlag, id, bio]
      );
      res.json({
        status: 200,
      });
    }
  } catch (error) {
    res.json({ status: 404, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      'SELECT * FROM "user" WHERE "email"=$1 AND "password"=$2',
      [email, password]
    );
    if (result.rows.length !== 0) {
      const user = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        name: result.rows[0].name,
        image: result.rows[0].image,
        editFlag: result.rows[0].editFlag,
        bio: result.rows.bio,
      };
      req.session.user = user;
      res.json({ status: 200, user: req.session.user });
    } else res.json({ status: 400 });
  } catch (error) {
    console.log(error.message);
  }
};
const check = async (req, res) => {
  try {
    console.log("called");
    console.log(req.session.user);
    if (req.session.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.session.user,
      });
    } else {
      res.json({
        user: req.session.user,
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
module.exports = { addGoogleGitUser, addNewUser, login, check };
