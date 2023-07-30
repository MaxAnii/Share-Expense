const pool = require("../config/db");
const { postgresDateFormate } = require("./noteDetails");

const addExpense = async (req, res) => {
  try {
    const { noteid, expenseid, reason, amount } = req.body;
    const date = postgresDateFormate();
    const result = await pool.query(
      'INSERT INTO "expense" VALUES($1,$2,$3,$4,$5) RETURNING *',
      [noteid, expenseid, reason, amount, date]
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

const getExpense = async (req, res) => {
  try {
    const { noteid } = req.params;
    const result = await pool.query(
      'SELECT * FROM "expense" WHERE "noteid"=$1',
      [noteid]
    );
    console.log(result.rows);
    if (result.rows.length !== 0) {
      res.json(result.rows);
    } else {
      res.json({
        status: 400,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { addExpense, getExpense };
