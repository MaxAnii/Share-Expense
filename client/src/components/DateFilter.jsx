import React from "react";

const DateFilter = (props) => {
  const date = new Date().toLocaleDateString();
  const dateArray = date.split("/");
  const year = dateArray[2];
  const month = dateArray[1];
  const day = dateArray[0];
  const toDate = year + "-" + month + "-" + day;
  const fromDate = year;
  props.setToDate(dateFormate());

  return (
    <>
      <div class="input-group">
        <span class="input-group-text">From</span>
        <input
          type="date"
          aria-label="First name"
          class="form-control"
          onChange={(e) => alert(e.target.value)}
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
