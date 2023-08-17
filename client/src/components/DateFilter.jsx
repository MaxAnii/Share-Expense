import React from "react";

const DateFilter = (props) => {
  const date = new Date().toLocaleDateString();
  const dateArray = date.split("/");
  const year = dateArray[2];
  const month = dateArray[1];
  const day = dateArray[0];
  var firstDay = new Date(year, month, 1);
  const toDate = year + "-" + month + "-" + day;
  const dayFirst = "1";
  const from2 =
    year.toString() + "-" + month.toString() + "-" + dayFirst.toString();

  const fromDate = year + "-" + month + "-" + dayFirst;
  props.setToDate(toDate);
  props.setFromDate(firstDay);
  return (
    <>
      <div class="input-group">
        <span class="input-group-text">From</span>
        <input
          type="date"
          aria-label="First name"
          class="form-control"
          onChange={(e) => alert(e.target.value)}
          value={props.fromDate}
        />
      </div>
      <div class="input-group">
        <span class="input-group-text">To</span>
        <input
          type="date"
          aria-label="Last name"
          class="form-control"
          value={props.toDate}
        />
      </div>
    </>
  );
};

export default DateFilter;
