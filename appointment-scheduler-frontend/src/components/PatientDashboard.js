import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const cancelAppointment = (id) => {
    const updated = appointments.map((appt) =>
      appt.id === id
        ? { ...appt, status: "Cancelled" }
        : appt
    );

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const handleReschedule = (id) => {
    setEditingId(id);
  };

  const saveReschedule = (id) => {
    if (!newDate || !newTime) {
      alert("Please select new date and time");
      return;
    }

    const updated = appointments.map((appt) =>
      appt.id === id
        ? { ...appt, date: newDate, time: newTime, status: "Pending" }
        : appt
    );

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));

    setEditingId(null);
    setNewDate("");
    setNewTime("");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>My Appointments</h2>

        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          <div className="appointment-list">
            {appointments.map((appt) => (
              <div key={appt.id} className="appointment-item">
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Provider:</strong> {appt.provider}</p>

                <span className={`status-badge ${appt.status.toLowerCase()}`}>
                  {appt.status}
                </span>

                {appt.status !== "Cancelled" && (
                  <div className="action-buttons">
                    <button
                      className="cancel-btn"
                      onClick={() => cancelAppointment(appt.id)}
                    >
                      Cancel
                    </button>

                    <button
                      className="reschedule-btn"
                      onClick={() => handleReschedule(appt.id)}
                    >
                      Reschedule
                    </button>
                  </div>
                )}

                {/* Reschedule Form */}
                {editingId === appt.id && (
                  <div className="reschedule-form">
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                    />

                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />

                    <button
                      className="save-btn"
                      onClick={() => saveReschedule(appt.id)}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;