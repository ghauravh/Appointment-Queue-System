import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AppointmentForm from "./components/AppointmentForm";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return <AppointmentForm />;
}

export default App;