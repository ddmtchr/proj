package com.leti.project.repository;

import com.leti.project.domain.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findAllByVacancyId(Long vacancyId);
    void deleteAllByVacancy_Id(Long vacancyId);
}
