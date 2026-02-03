import React, { useState } from 'react';
import CalendarComponent from './CalendarComponent';
import api from '../api';
import './AppointmentForm.css';

const AppointmentForm = ({ fetchAppointments }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('');
  const [provider, setProvider] = useState('');
  const [patient, setPatient] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

const scheduleAppointment = async (event) => {
  event.preventDefault();

  if (!selectedDate) {
    alert("Please select an appointment date");
    return;
  }

  console.log("Appointment data prepared:", {
    date: selectedDate.toDateString(),
    patient,
    provider,
    time,
  });
};

  return (
    <div className="appointment-form-container">
      <div className="appointment-card">
        <h2>Book Appointment</h2>

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

        {success && (
          <div className="booking-success">
            <strong>Success!</strong> Appointment booked.
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;