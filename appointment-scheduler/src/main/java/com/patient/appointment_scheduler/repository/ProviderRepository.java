package com.patient.appointment_scheduler.repository;

import com.patient.appointment_scheduler.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProviderRepository extends JpaRepository<Provider, Long> {
}
