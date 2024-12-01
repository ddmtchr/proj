package com.leti.project.service;

import com.leti.project.domain.Candidate;
import com.leti.project.domain.Vacancy;
import com.leti.project.dto.request.CandidateRequestDTO;
import com.leti.project.dto.response.CandidateResponseDTO;
import com.leti.project.exception.CandidateNotFoundException;
import com.leti.project.exception.VacancyNotFoundException;
import com.leti.project.mapper.CandidateMapper;
import com.leti.project.repository.CandidateRepository;
import com.leti.project.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateService {
    private final CandidateRepository candidateRepository;
    private final VacancyRepository vacancyRepository;

    public List<CandidateResponseDTO> getAllCandidates() {
        return candidateRepository.findAll().stream().map(CandidateMapper.INSTANCE::toResponseDTO).toList();
    }

    public CandidateResponseDTO getCandidateById(Long id) {
        Candidate candidate = candidateRepository.findById(id).orElseThrow(() -> new CandidateNotFoundException("Candidate was not found"));
        return CandidateMapper.INSTANCE.toResponseDTO(candidate);
    }

    public List<CandidateResponseDTO> getAllCandidatesByVacancyId(Long vacancyId) {
        if (!vacancyRepository.existsById(vacancyId)) {
            throw new VacancyNotFoundException("Vacancy was not found");
        }
        return candidateRepository.findAllByVacancyId(vacancyId).stream().map(CandidateMapper.INSTANCE::toResponseDTO).toList();
    }

    public CandidateResponseDTO addCandidate(CandidateRequestDTO requestDTO, Long vacancyId) {
        Candidate candidate = CandidateMapper.INSTANCE.toEntity(requestDTO);
        Vacancy vacancy = vacancyRepository.findById(vacancyId).orElseThrow(() -> new VacancyNotFoundException("Vacancy was not found"));
        candidate.setVacancy(vacancy);
        return CandidateMapper.INSTANCE.toResponseDTO(candidateRepository.save(candidate));
    }

    public CandidateResponseDTO editCandidate(Long id, CandidateRequestDTO requestDTO) {
        Candidate candidate = candidateRepository.findById(id).orElseThrow(() -> new CandidateNotFoundException("Candidate was not found"));
        CandidateMapper.INSTANCE.updateCandidate(requestDTO, candidate);
        return CandidateMapper.INSTANCE.toResponseDTO(candidateRepository.save(candidate));
    }

    public void deleteCandidate(Long id) {
        candidateRepository.deleteById(id);
    }
}

