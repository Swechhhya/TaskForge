import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";

const UserDashboard = () => {
  useUserAuth();
  return <div>UserDashBoard</div>;
};

export default UserDashboard;
