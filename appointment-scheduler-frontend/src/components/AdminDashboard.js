import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterProvider, setFilterProvider] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));

  };

  const filteredAppointments = appointments.filter((appt) => {
    return (
      (filterProvider === "" || appt.provider === filterProvider) &&
      (filterDate === "" || appt.date === filterDate)
    );
  });

  const totalAppointments = filteredAppointments.length;
  const completedCount = filteredAppointments.filter(
    (appt) => appt.status === "Completed"
  ).length;

  return (
  <div className="admin-container">
    <div className="admin-card">

      <h2>Admin Dashboard</h2>

      {/* Filters */}
      <div className="admin-filters">
        <input
          type="text"
          placeholder="Filter by Provider"
          value={filterProvider}
          onChange={(e) => setFilterProvider(e.target.value)}
        />

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Appointments */}
      <div className="admin-appointment-list">
        {appointments.map((appt) => (
          <div key={appt.id} className="admin-appointment-item">

  <div className="appointment-info">
    <p><strong>Date:</strong> {appt.date}</p>
    <p><strong>Time:</strong> {appt.time}</p>
    <p><strong>Provider:</strong> {appt.provider}</p>
  </div>

  <div className="appointment-actions">
    <span className={`status-badge ${appt.status.toLowerCase()}`}>
      {appt.status}
    </span>

    <div className="action-buttons">
      <button
        className="confirm-btn"
        onClick={() => updateStatus(appt.id, "Confirmed")}
      >
        Confirm
      </button>

      <button
        className="cancel-btn"
        onClick={() => updateStatus(appt.id, "Cancelled")}
      >
        Cancel
      </button>
    </div>
  </div>

</div>
        ))}
      </div>

    </div>
  </div>
);
};

export default AdminDashboard;