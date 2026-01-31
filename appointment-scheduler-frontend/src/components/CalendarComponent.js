import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";

/* ✅ Custom clinic holidays (YYYY-MM-DD) */
const HOLIDAYS = [
  "2026-01-26", // Republic Day
  "2026-08-15", // Independence Day
  "2026-10-02", // Gandhi Jayanti
];

/* ✅ Max appointments per day */
const MAX_APPOINTMENTS_PER_DAY = 10;

/* ✅ Mock booking counts (UI-only) */
const BOOKED_DATES = {
  "2026-01-31": 10,
  "2026-02-05": 10,
  "2026-02-10": 8,
};

const CalendarComponent = ({ onDateChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState(today);

  /* 🔹 Helper: format date as YYYY-MM-DD */
  const formatDate = (date) => date.toISOString().split("T")[0];

  /* 🔹 Helper: check holiday */
  const isHoliday = (date) => HOLIDAYS.includes(formatDate(date));

  /* 🔹 Helper: check fully booked */
  const isFullyBooked = (date) =>
    BOOKED_DATES[formatDate(date)] >= MAX_APPOINTMENTS_PER_DAY;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        minDate={today}

        /* ❌ Disable Sundays, holidays, fully booked days */
        tileDisabled={({ date, view }) =>
          view === "month" &&
          (date.getDay() === 0 || isHoliday(date) || isFullyBooked(date))
        }

        /* 📝 Status text on tiles */
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          if (date.getDay() === 0 || isHoliday(date)) {
            return (
              <span className="clinic-closed-text">Clinic Closed</span>
            );
          }

          if (isFullyBooked(date)) {
            return (
              <span className="fully-booked-text">Fully Booked</span>
            );
          }

          return null;
        }}
      />

      <p className="selected-date">
        Selected Date: {selectedDate.toDateString()}
      </p>
    </div>
  );
};

export default CalendarComponent;