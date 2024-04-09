import React from "react";

const AlertMsg = ({ alert }) => {
  if (!alert.show) return null;

  return (
    <div className="alert alert-primary mt-5 alert-enter" role="alert">
      {alert.message}
    </div>
  );
};

export default AlertMsg;
