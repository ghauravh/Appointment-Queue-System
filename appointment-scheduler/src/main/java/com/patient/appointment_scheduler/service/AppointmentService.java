package com.patient.appointment_scheduler.service;

import java.time.LocalDate;
import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
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
    @Transactional
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
    @Transactional
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
    @Transactional
    public void cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        int cancelledQueueNumber = appointment.getQueueNumber();

        // Mark appointment as CANCELLED
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);

        // Get all appointments behind this one
        List<Appointment> remainingAppointments =
                appointmentRepository
                        .findByAppointmentDateAndTimeAndProviderAndQueueNumberGreaterThanOrderByQueueNumberAsc(
                                appointment.getAppointmentDate(),
                                appointment.getTime(),
                                appointment.getProvider(),
                                cancelledQueueNumber
                        );

        // Shift queue numbers up
        for (Appointment a : remainingAppointments) {
            a.setQueueNumber(a.getQueueNumber() - 1);
            appointmentRepository.save(a);
        }

        // If cancelled appointment was IN_PROGRESS, start next
        if (appointment.getStatus() == AppointmentStatus.IN_PROGRESS && !remainingAppointments.isEmpty()) {
            Appointment next = remainingAppointments.get(0);
            next.setStatus(AppointmentStatus.IN_PROGRESS);
            appointmentRepository.save(next);
        }
    }

    @Value("${appointment.avg.service.minutes}")
    private int avgServiceMinutes;

    public int estimateWaitTime(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Find current IN_PROGRESS appointment
        Appointment current =
                appointmentRepository
                        .findByAppointmentDateAndTimeAndProviderAndStatus(
                                appointment.getAppointmentDate(),
                                appointment.getTime(),
                                appointment.getProvider(),
                                AppointmentStatus.IN_PROGRESS
                        )
                        .orElse(null);

        if (current == null) {
            return 0; // No waiting
        }

        int peopleAhead =
                appointment.getQueueNumber() - current.getQueueNumber();

        return Math.max(0, peopleAhead * avgServiceMinutes);
    }
}