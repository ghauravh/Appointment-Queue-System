package com.patient.appointment_scheduler.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.patient.appointment_scheduler.model.Appointment;
import com.patient.appointment_scheduler.repository.AppointmentRepository;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> findByDate(LocalDate date) {
        return appointmentRepository.findByDate(date);
    }

    public void deleteById(Long id) {
        appointmentRepository.deleteById(id);
    }
}
