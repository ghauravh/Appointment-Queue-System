package com.patient.appointment_scheduler.repository;

import com.patient.appointment_scheduler.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
