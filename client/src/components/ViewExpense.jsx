import React, { useEffect, useState } from "react";
import EditExpense from "./EditExpense";
import DeleteExpense from "./DeleteExpense";
import { useParams } from "react-router-dom";
import DateFilter from "./DateFilter";

const ViewExpense = (props) => {
  const params = useParams();
  var totalAmount = 0;
  const [expenseData, setExpenseData] = useState([]);
  const [message, setMessage] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const getExpense = async () => {
    setExpenseData([]);
    const response = await fetch(
      `http://localhost:5000/user/getexpense/${props.noteid}/${fromDate}/${toDate}`,
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
  }, [props.functionCall, fromDate, toDate]);
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
      <div className="date-container">
        <h5>View Expenses</h5>
        <div className="date-section">
          <DateFilter
            getExpense={getExpense}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          ></DateFilter>
        </div>
      </div>
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
                    {props.loginUser === params.usernoteid ? (
                      <td>
                        <div className="expense-option">
                          <DeleteExpense
                            expenseid={elem.expenseid}
                            getExpense={getExpense}
                          ></DeleteExpense>
                          <EditExpense
                            expenseid={elem.expenseid}
                            reason={elem.reason}
                            amount={elem.amount}
                            getExpense={getExpense}
                          ></EditExpense>
                        </div>
                      </td>
                    ) : (
                      ""
                    )}
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
