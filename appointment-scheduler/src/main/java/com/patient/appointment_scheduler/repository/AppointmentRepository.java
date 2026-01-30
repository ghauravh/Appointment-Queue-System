package com.patient.appointment_scheduler.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import com.patient.appointment_scheduler.model.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import com.patient.appointment_scheduler.model.Appointment;
import com.patient.appointment_scheduler.model.Provider;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    long countByAppointmentDateAndTimeAndProvider(
            LocalDate appointmentDate,
            LocalTime time,
            Provider provider
    );

    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);


    Optional<Appointment> findFirstByAppointmentDateAndTimeAndProviderAndQueueNumberGreaterThanOrderByQueueNumberAsc(
            LocalDate appointmentDate,
            LocalTime time,
            Provider provider,
            int queueNumber
    );
    boolean existsByAppointmentDateAndTimeAndProviderAndStatus(
            LocalDate appointmentDate,
            LocalTime time,
            Provider provider,
            AppointmentStatus status
    );

    List<Appointment> findByAppointmentDateAndTimeAndProviderAndQueueNumberGreaterThanOrderByQueueNumberAsc(
            LocalDate appointmentDate,
            LocalTime time,
            Provider provider,
            int queueNumber
    );
}