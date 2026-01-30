import React, { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import api from "../api";
import "./AppointmentForm.css";

const AppointmentForm = ({ fetchAppointments }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [provider, setProvider] = useState("");
  const [patient, setPatient] = useState("");
  const [bookingResult, setBookingResult] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const scheduleAppointment = async (event) => {
    event.preventDefault();

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    const appointmentData = {
      appointmentDate: selectedDate.toISOString().split("T")[0],
      time: time,
      patient: {
        name: patient,
      },
      provider: {
        name: provider,
      },
    };

    try {
      const response = await api.post("/appointments", appointmentData);
      setBookingResult(response.data);

      // Reset form
      setPatient("");
      setProvider("");
      setTime("");
      setSelectedDate(null);

      fetchAppointments();
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert(error.response?.data?.error || "Failed to book appointment");
    }
  };

  return (
    <div className="appointment-form-container">
      {/* ❌ Removed duplicate heading */}
      <CalendarComponent onDateChange={handleDateChange} />

      <form onSubmit={scheduleAppointment}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Provider Name"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          required
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button type="submit">Book Appointment</button>
      </form>
      {bookingResult && (
  <div className="booking-success">
    <p>✅ Appointment Booked Successfully</p>
    <p><strong>Queue Number:</strong> {bookingResult.queueNumber}</p>
    <p><strong>Status:</strong> {bookingResult.status}</p>
  </div>
)}
    </div>
  );
};

export default AppointmentForm;