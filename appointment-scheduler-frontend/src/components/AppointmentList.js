import React, { useEffect, useState } from 'react';
import api from '../api';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const response = await api.get('/appointments');
        setAppointments(response.data);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div>
            <h2>Appointments</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        {appointment.date} - {appointment.time} with {appointment.provider.name} for {appointment.patient.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
