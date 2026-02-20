import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  // TEMP role logic
  if (email === "admin@clinic.com") {
    onLogin({ email, role: "admin" });
  } else {
    onLogin({ email, role: "patient" });
  }
};
//login page code
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Clinic login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;