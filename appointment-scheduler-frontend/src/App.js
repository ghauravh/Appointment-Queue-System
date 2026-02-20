import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AppointmentForm from "./components/AppointmentForm";
import AdminDashboard from "./components/AdminDashboard";
import PatientDashboard from "./components/PatientDashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);  // stores logged in user
  const [role, setRole] = useState(null);  // "patient" or "admin"

  if (!user) {
    return (
      <LoginPage
        onLogin={(userData) => {
          setUser(userData);

          // Simple role logic (temporary)
          if (userData.email === "admin@clinic.com") {
            setRole("admin");
          } else {
            setRole("patient");
          }
        }}
      />
    );
  }

  return (
    <>
      {role === "admin" && <AdminDashboard />}
      {role === "patient" && <AppointmentForm />}
    </>
  );
}

export default App;