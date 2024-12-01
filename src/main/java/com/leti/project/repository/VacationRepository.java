package com.leti.project.repository;

import com.leti.project.domain.Vacation;
import com.leti.project.domain.VacationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VacationRepository extends JpaRepository<Vacation, Long> {
    List<Vacation> findAllByStatus(VacationStatus status);
    List<Vacation> findAllByEmployee_User_Id(Long id);
    Optional<Vacation> findByIdAndEmployee_User_Id(Long id, Long userId);
    void deleteAllByEmployee_Id(Long id);
}
