import React, { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import { domains, providers } from "../data/providers";
import { TIME_SLOTS } from "../data/timeSlots";
import { getBookedSlots } from "../utils/slotUtils";
import "./AppointmentForm.css";
import { getQueueAndWaitTime } from "../utils/queueUtils";  


const AppointmentForm = () => {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  /* Filter providers by domain */
  const filteredProviders = providers.filter(
    (p) => p.domain === selectedDomain
  );

  /* Get booked slots (mocked) */
  const bookedSlots = getBookedSlots(selectedProvider, selectedDate);

  const queueInfo = getQueueAndWaitTime(
  selectedProvider,
  selectedDate,
  selectedTime
);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select date and time slot");
      return;
    }

    console.log({
      domain: selectedDomain,
      provider: selectedProvider,
      date: selectedDate,
      time: selectedTime,
    });

    alert("Appointment data prepared (frontend-only)");
  };

  return (
    <div className="appointment-form-container">
      <div className="appointment-card">
        <h2>Book Clinic Appointment</h2>

        {/* DOMAIN */}
        <select
          value={selectedDomain}
          onChange={(e) => {
            setSelectedDomain(e.target.value);
            setSelectedProvider("");
            setSelectedTime("");
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

        {/* PROVIDER */}
        <select
          value={selectedProvider}
          onChange={(e) => {
            setSelectedProvider(e.target.value);
            setSelectedTime("");
          }}
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
        
        {!selectedProvider && selectedDate && (
  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "12px" }}>
    Please select a provider to view available time slots
  </p>
)}
        {/* TIME SLOTS */}
        {selectedProvider && selectedDate && (
          <div className="time-slot-section">
            <div className="slot-title">Select Time Slot</div>

            <div className="time-slots">
              {TIME_SLOTS.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedTime === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-btn 
                      ${isSelected ? "selected" : ""} 
                      ${isBooked ? "booked" : ""}`}
                    disabled={isBooked}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUEUE & WAIT TIME */}
        {queueInfo && (
          <div className="booking-success">
            <strong>Queue Number:</strong> {queueInfo.queueNumber}
            <br />
            <strong>Estimated Wait Time:</strong>{" "}
            {queueInfo.estimatedWaitTime} minutes
          </div>
        )}

        <button onClick={handleSubmit}>Book Appointment</button>
      </div>
    </div>
  );
};

export default AppointmentForm;