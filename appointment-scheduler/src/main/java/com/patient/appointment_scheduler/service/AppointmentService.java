package com.patient.appointment_scheduler.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.patient.appointment_scheduler.model.Appointment;
import com.patient.appointment_scheduler.model.AppointmentStatus;
import com.patient.appointment_scheduler.repository.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // BOOK APPOINTMENT
    public Appointment bookAppointment(Appointment appointment) {

        long existingCount =
                appointmentRepository.countByAppointmentDateAndTimeAndProvider(
                        appointment.getAppointmentDate(),
                        appointment.getTime(),
                        appointment.getProvider()
                );

        appointment.setQueueNumber((int) existingCount + 1);
        appointment.setStatus(AppointmentStatus.PENDING);

        return appointmentRepository.save(appointment);
    }

    // FIND ALL
    public List<Appointment> findAllAppointments() {
        return appointmentRepository.findAll();
    }

    // FIND BY DATE
    public List<Appointment> findAppointmentsByDate(LocalDate appointmentDate) {
        return appointmentRepository.findByAppointmentDate(appointmentDate);
    }

    // UPDATE APPOINTMENT STATUS
    public Appointment updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // 🚫 Prevent multiple IN_PROGRESS appointments
        if (status == AppointmentStatus.IN_PROGRESS) {

            boolean alreadyInProgress =
                    appointmentRepository.existsByAppointmentDateAndTimeAndProviderAndStatus(
                            appointment.getAppointmentDate(),
                            appointment.getTime(),
                            appointment.getProvider(),
                            AppointmentStatus.IN_PROGRESS
                    );

            if (alreadyInProgress) {
                throw new RuntimeException(
                        "Another appointment is already IN_PROGRESS for this slot");
            }
        }

        appointment.setStatus(status);
        appointmentRepository.save(appointment);

        // 🔁 Auto-move queue when COMPLETED
        if (status == AppointmentStatus.COMPLETED) {

            appointmentRepository
                    .findFirstByAppointmentDateAndTimeAndProviderAndQueueNumberGreaterThanOrderByQueueNumberAsc(
                            appointment.getAppointmentDate(),
                            appointment.getTime(),
                            appointment.getProvider(),
                            appointment.getQueueNumber()
                    )
                    .ifPresent(next -> {
                        next.setStatus(AppointmentStatus.IN_PROGRESS);
                        appointmentRepository.save(next);
                    });
        }

        return appointment;
    }
}