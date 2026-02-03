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
  const TIME_SLOTS = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30"
];

// TEMP: simulate booked slots
const BOOKED_SLOTS = ["10:30", "15:00"];

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

         <div className="time-slot-section">
  <p className="slot-title">Select Time</p>

  <div className="time-slots">
    {TIME_SLOTS.map((slot) => {
      const isBooked = BOOKED_SLOTS.includes(slot);
      const isSelected = time === slot;

      return (
        <button
          key={slot}
          type="button"
          className={`time-slot 
            ${isBooked ? "disabled" : ""} 
            ${isSelected ? "selected" : ""}`}
          onClick={() => !isBooked && setTime(slot)}
          disabled={isBooked}
        >
          {slot}
        </button>
      );
    })}
  </div>
</div>

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