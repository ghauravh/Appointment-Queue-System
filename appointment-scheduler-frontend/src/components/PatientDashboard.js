import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  return (
    <div className="dashboard-container">
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <div className="appointment-list">
          {appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Provider:</strong> {appt.provider}</p>
              <p><strong>Status:</strong> {appt.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;