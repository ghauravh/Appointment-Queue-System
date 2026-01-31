import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css';

const CalendarComponent = ({ onDateChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
  minDate={today}

  /* Disable Sundays */
  tileDisabled={({ date, view }) =>
    view === 'month' && date.getDay() === 0
  }

  /* Show "Clinic Closed" on Sundays */
  tileContent={({ date, view }) =>
    view === 'month' && date.getDay() === 0 ? (
      <span className="clinic-closed-text">Clinic Closed</span>
    ) : null
  }
/>

      <p className="selected-date">
        Selected Date: {selectedDate.toDateString()}
      </p>
    </div>
  );
};

export default CalendarComponent;