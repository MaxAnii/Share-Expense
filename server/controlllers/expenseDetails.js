const pool = require("../config/db");
const { postgresDateFormate } = require("./noteDetails");

const addExpense = async (req, res) => {
  try {
    const { noteid, expenseid, reason, amount, roomid } = req.body;
    const date = postgresDateFormate();
    const result = await pool.query(
      'INSERT INTO "expense" VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [noteid, expenseid, reason, amount, date, roomid]
    );
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
    const { noteid, fromdate, todate } = req.params;
    const result = await pool.query(
      'SELECT * FROM "expense" WHERE "noteid"=$1 AND "expensedate" BETWEEN $2 AND $3 ORDER BY "expensedate" DESC ',
      [noteid, fromdate, todate]
    );
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
const deleteExpense = async (req, res) => {
  try {
    const { expenseid, noteid } = req.params;
    const reslut = await pool.query(
      'DELETE FROM "expense" WHERE "noteid"=$1 AND "expenseid"=$2 RETURNING *',
      [noteid, expenseid]
    );
    if (reslut.rows.length !== 0) {
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
const updateExpense = async (req, res) => {
  try {
    const { roomid, noteid, reason, amount, expenseid } = req.body;
    const reslut = await pool.query(
      'UPDATE "expense" SET "reason"=$1, "amount"=$2 WHERE "noteid"=$3 AND "roomid"=$4 AND "expenseid"=$5 RETURNING *',
      [reason, amount, noteid, roomid, expenseid]
    );
    if (reslut.rows.length !== 0) {
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

module.exports = { addExpense, getExpense, deleteExpense, updateExpense };
