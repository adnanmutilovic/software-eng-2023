import React from "react";

const Alerts = ({ message, type }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

export default Alerts;
