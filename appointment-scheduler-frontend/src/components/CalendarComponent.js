import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css';

const CalendarComponent = ({ onDateChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ✅ CRITICAL FIX

  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={today}   // ✅ works correctly now
      />
      <p className="selected-date">
        Selected Date: {selectedDate.toDateString()}
      </p>
    </div>
  );
};

export default CalendarComponent;