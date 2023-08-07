import React, { useEffect, useState } from "react";

const ViewExpense = (props) => {
  console.log(props);
  var totalAmount = 0;
  const [expenseData, setExpenseData] = useState([]);
  const [message, setMessage] = useState("");

  const getExpense = async () => {
    const response = await fetch(
      `http://localhost:5000/user/getexpense/${props.noteid}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status === 400) {
      setMessage("An error has occured");
    } else {
      setExpenseData(data);
    }
  };
  useEffect(() => {
    getExpense();
  }, [props.functionCall]);
  expenseData.map((elem) => {
    totalAmount += parseFloat(elem.amount);
  });
  return (
    <div>
      <div className="total-expense mb-3 ">
        <div>This month's expense </div>
        <div>{totalAmount}</div>
      </div>
      <hr></hr>
      <h5>All Expenses</h5>
      <div className="overflow-table">
        <table class="table table-striped table-borderless">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {expenseData.map((elem) => {
              return (
                <>
                  <tr className="data-row " id={elem.expenseid}>
                    <td className="date-cell">
                      {elem.expensedate.slice(0, 10)}
                    </td>
                    <td className="reason-cell ">{elem.reason}</td>
                    <td>{elem.amount}</td>
                  </tr>
                  <div className="row-gap"></div>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewExpense;
