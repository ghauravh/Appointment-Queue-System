import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";

/* Clinic holidays */
const HOLIDAYS = ["2026-01-26", "2026-10-02"];

/* Booking rules (UI only) */
const MAX_APPOINTMENTS_PER_DAY = 10;
const BOOKED_DATES = {
  "2026-02-05": 10,
  "2026-02-12": 10,
};

const CalendarComponent = ({ onDateChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState(today);

  const formatDate = (date) => date.toISOString().split("T")[0];
  const isHoliday = (date) => HOLIDAYS.includes(formatDate(date));
  const isFullyBooked = (date) =>
    BOOKED_DATES[formatDate(date)] >= MAX_APPOINTMENTS_PER_DAY;

  const handleChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        value={selectedDate}
        onChange={handleChange}
        minDate={today}
        tileDisabled={({ date, view }) =>
          view === "month" &&
          (date.getDay() === 0 || isHoliday(date) || isFullyBooked(date))
        }
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          if (date.getDay() === 0 || isHoliday(date)) {
            return <span className="status closed">Closed</span>;
          }
          if (isFullyBooked(date)) {
            return <span className="status full">Full</span>;
          }
          return null;
        }}
      />

      <p className="selected-date">
        Selected: {selectedDate.toDateString()}
      </p>
    </div>
  );
};

export default CalendarComponent;