import React from "react";

const Alert = (props) => {
  return (
    <div className={`alert alert-${props.type} sticky-top`} role="alert">
      {props.message}
    </div>
  );
};

export default Alert;
