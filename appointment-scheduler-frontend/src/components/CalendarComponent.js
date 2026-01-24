import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css';

const CalendarComponent = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateChange(date); // Callback to parent component
    };

    return (
        <div className="calendar-container">
            <h3>Select an Appointment Date</h3>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()} // Disable past dates
            />
            <p className="selected-date">Selected Date: {selectedDate.toDateString()}</p>
        </div>
    );
};

export default CalendarComponent;
