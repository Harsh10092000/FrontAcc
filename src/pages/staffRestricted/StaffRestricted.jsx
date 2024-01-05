import React from "react";
import { Link } from "react-router-dom";

const StaffRestricted = () => {
  return (
    <div>
      <div>Account Restricted</div>
      <div>Contact Your Admin</div>
      <Link to="/contact">
        <div>Contact Us</div>
      </Link>
    </div>
  );
};

export default StaffRestricted;
