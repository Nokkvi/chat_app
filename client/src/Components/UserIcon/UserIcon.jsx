import React from "react";

import styles from "./UserIcon.module.css";

const UserIcon = ({ user }) => {
  return (
    <div
      className={`text-center me-2 pt-2 border border-dark rounded-circle ${styles.icon}`}
    >
      {user.slice(0, 2).toUpperCase()}
    </div>
  );
};

export default UserIcon;
