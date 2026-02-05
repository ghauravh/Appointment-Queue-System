import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload(); // simplest redirect
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;