import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>Page not Found</h3>
      <Link className="btn btn-primary" to="/">
        {" "}
        Back to Home Screen{" "}
      </Link>
    </div>
  );
};

export default NotFound;
