import React from "react";

const LoadingButton = () => {
  return (
    <button className="submit" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  );
};

export default LoadingButton;
