package com.patient.appointment_scheduler.controller;

import java.time.LocalDate;
import java.util.List;

import com.patient.appointment_scheduler.model.AppointmentStatus;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.patient.appointment_scheduler.model.Appointment;
import com.patient.appointment_scheduler.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // 1️⃣ BOOK APPOINTMENT
    @PostMapping
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    // 2️⃣ GET ALL APPOINTMENTS
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.findAllAppointments();
    }

    // 3️⃣ GET APPOINTMENTS BY DATE
    @GetMapping("/date/{appointmentDate}")
    public List<Appointment> getAppointmentsByDate(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate appointmentDate) {

        return appointmentService.findAppointmentsByDate(appointmentDate);
    }

    // 4️⃣ UPDATE APPOINTMENT STATUS
    @PutMapping("/{id}/status")
    public Appointment updateStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status) {

        return appointmentService.updateAppointmentStatus(id, status);
    }
    //  CANCEL APPOINTMENT
    @PutMapping("/{id}/cancel")
    public void cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
    }
}