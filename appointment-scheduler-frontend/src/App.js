import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AppointmentForm from "./components/AppointmentForm";
import PatientDashboard from "./components/PatientDashboard";
import AdminDashboard from "./components/AdminDashboard";
//c
function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("book");

  // Not logged in → show login
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  // Admin
  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  // Patient
  return (
    <>
      {page === "book" && (
        <AppointmentForm
          onBookingSuccess={() => setPage("dashboard")}
        />
      )}

      {page === "dashboard" && (
        <PatientDashboard />
      )}
    </>
  );
}

export default App;