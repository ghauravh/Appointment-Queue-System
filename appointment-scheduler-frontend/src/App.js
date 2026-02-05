import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AppointmentForm from "./components/AppointmentForm";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <AppointmentForm />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;