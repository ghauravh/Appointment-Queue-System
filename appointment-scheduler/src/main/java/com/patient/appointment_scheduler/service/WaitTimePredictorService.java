package com.patient.appointment_scheduler.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.patient.appointment_scheduler.model.Appointment;
import com.patient.appointment_scheduler.model.Provider;
import com.patient.appointment_scheduler.repository.AppointmentRepository;

@Service
public class WaitTimePredictorService {

    private final AppointmentRepository appointmentRepository;

    public WaitTimePredictorService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public int predictWaitTime(Provider provider,
                               LocalDate date,
                               LocalTime time) {

        // Step 1: Get queue size for that slot
        long queueSize = appointmentRepository
                .countByAppointmentDateAndTimeAndProvider(
                        date,
                        time,
                        provider
                );

        // Step 2: Base consultation time (15 mins avg)
        int baseConsultTime = 15;

        int waitTime = (int) queueSize * baseConsultTime;

        return waitTime;
    }

    private double calculateProviderEfficiency(Provider provider) {

        List<Appointment> history =
                appointmentRepository.findByProvider(provider);

        if (history.isEmpty()) {
            return 1.0;
        }

        long cancelledCount = history.stream()
                .filter(a -> a.getStatus().name().equals("CANCELLED"))
                .count();

        double cancellationRate = (double) cancelledCount / history.size();

        // Higher cancellation = lower effective load
        return 1.0 - (cancellationRate * 0.3);
    }
}