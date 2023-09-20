import React, { useEffect } from "react";

const DateFilter = (props) => {
  const date = new Date().toLocaleDateString();
  const dateArray = date.split("/");
  const year = dateArray[2];
  const month = dateArray[1];
  const day = dateArray[0];
  const toDate = year + "-" + month + "-" + day;

  var firstDayDate = new Date(year, month, 1).toLocaleDateString();
  const firstDayDateArray = firstDayDate.split("/");
  const dayfirst = firstDayDateArray[0];
  const from = year + "-" + month + "-" + dayfirst;

  useEffect(() => {
    props.setToDate(toDate);
    props.setFromDate(from);
  }, []);

  return (
    <>
      <div className="input-group">
        <span className="input-group-text">From</span>
        <input
          type="date"
          className="form-control"
          value={props.fromDate}
          onChange={(e) => props.setFromDate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <span className="input-group-text">To</span>
        <input
          type="date"
          className="form-control"
          value={props.toDate}
          onChange={(e) => props.setToDate(e.target.value)}
        />
      </div>
    </>
  );
};

export default DateFilter;
