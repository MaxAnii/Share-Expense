import React, { useEffect } from "react";
import moment from "moment-timezone";

const DateFilter = (props) => {
  var momentDate = moment();
  const date = momentDate.format("YYYY-MM-DD");
  const toDate = date;
  const from = momentDate.format("YYYY-MM") + "-" + "01";

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
