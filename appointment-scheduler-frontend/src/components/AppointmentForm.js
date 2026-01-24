import React, { useState } from 'react';
import CalendarComponent from './CalendarComponent';
import api from '../api';
import './AppointmentForm.css';

const AppointmentForm = ({ fetchAppointments }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [time, setTime] = useState('');
    const [provider, setProvider] = useState('');
    const [patient, setPatient] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const scheduleAppointment = async (event) => {
        event.preventDefault();
        const appointmentData = {
            date: selectedDate.toISOString().split('T')[0],
            time,
            provider,
            patient,
        };
        try {
            const response = await api.post('/appointments', appointmentData);
            console.log('Appointment scheduled:', response.data);
            fetchAppointments();
        } catch (error) {
            console.error('Error scheduling appointment:', error);
        }
    };

    return (
        <div className="appointment-form-container">
            <h2>Schedule an Appointment</h2>
            <CalendarComponent onDateChange={handleDateChange} />
            <form onSubmit={scheduleAppointment}>
                <input
                    type="text"
                    placeholder="Patient Name"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Provider Name"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default AppointmentForm;
