import React, { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import { domains, providers } from "../data/providers";
import "./AppointmentForm.css";

const AppointmentForm = () => {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");

  const filteredProviders = providers.filter(
    (p) => p.domain === selectedDomain
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      domain: selectedDomain,
      provider: selectedProvider,
      date: selectedDate,
      time,
    });

    alert("Appointment data prepared (frontend-only)");
  };

  return (
    <div className="appointment-form-container">
      <div className="appointment-card">
        <h2>Book Clinic Appointment</h2>

        {/* DOMAIN SELECT */}
        <select
          value={selectedDomain}
          onChange={(e) => {
            setSelectedDomain(e.target.value);
            setSelectedProvider("");
          }}
          required
        >
          <option value="">Select Medical Domain</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>

        {/* PROVIDER SELECT */}
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          disabled={!selectedDomain}
          required
        >
          <option value="">Select Provider</option>
          {filteredProviders.map((provider) => (
            <option key={provider.id} value={provider.name}>
              {provider.name}
            </option>
          ))}
        </select>

        {/* CALENDAR */}
        <CalendarComponent onDateChange={setSelectedDate} />

        {/* TIME */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button onClick={handleSubmit}>Book Appointment</button>
      </div>
    </div>
  );
};

export default AppointmentForm;