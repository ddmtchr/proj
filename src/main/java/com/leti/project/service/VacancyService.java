package com.leti.project.service;

import com.leti.project.domain.Vacancy;
import com.leti.project.domain.VacancyStatus;
import com.leti.project.dto.request.VacancyRequestDTO;
import com.leti.project.dto.response.VacancyResponseDTO;
import com.leti.project.exception.VacancyIllegalStateException;
import com.leti.project.exception.VacancyNotFoundException;
import com.leti.project.mapper.VacancyMapper;
import com.leti.project.repository.CandidateRepository;
import com.leti.project.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class VacancyService {
    private final VacancyRepository vacancyRepository;
    private final CandidateRepository candidateRepository;

    public List<VacancyResponseDTO> getAllVacancies() {
        return vacancyRepository.findAll().stream().map(VacancyMapper.INSTANCE::toResponseDTO).toList();
    }

    public VacancyResponseDTO getVacancyById(Long id) {
        Vacancy vacancy = vacancyRepository.findById(id).orElseThrow(() -> new VacancyNotFoundException("Vacancy was not found"));
        return VacancyMapper.INSTANCE.toResponseDTO(vacancy);
    }

    public VacancyResponseDTO openVacancy(VacancyRequestDTO requestDTO) {
        Vacancy vacancy = VacancyMapper.INSTANCE.toEntity(requestDTO);
        vacancy.setPostedDate(LocalDate.now());
        vacancy.setStatus(VacancyStatus.OPEN);
        return VacancyMapper.INSTANCE.toResponseDTO(vacancyRepository.save(vacancy));
    }

    public VacancyResponseDTO editVacancy(Long id, VacancyRequestDTO requestDTO) {
        Vacancy vacancy = vacancyRepository.findById(id).orElseThrow(() -> new VacancyNotFoundException("Vacancy was not found"));
        VacancyMapper.INSTANCE.updateVacancy(requestDTO, vacancy);
        return VacancyMapper.INSTANCE.toResponseDTO(vacancyRepository.save(vacancy));
    }

    public VacancyResponseDTO closeVacancy(Long id) {
        Vacancy vacancy = vacancyRepository.findById(id).orElseThrow(() -> new VacancyNotFoundException("Vacancy was not found"));
        if (vacancy.getStatus() == VacancyStatus.CLOSED) {
            throw new VacancyIllegalStateException("Vacancy is already closed");
        }
        vacancy.setStatus(VacancyStatus.CLOSED);
        vacancy.setClosedDate(LocalDate.now());
        return VacancyMapper.INSTANCE.toResponseDTO(vacancyRepository.save(vacancy));
    }

    public VacancyResponseDTO reopenVacancy(Long id) {
        Vacancy vacancy = vacancyRepository.findById(id).orElseThrow(() -> new VacancyNotFoundException("Vacancy was not found"));
        if (vacancy.getStatus() == VacancyStatus.OPEN) {
            throw new VacancyIllegalStateException("Vacancy is already opened");
        }
        vacancy.setStatus(VacancyStatus.OPEN);
        vacancy.setClosedDate(null);
        return VacancyMapper.INSTANCE.toResponseDTO(vacancyRepository.save(vacancy));
    }

    public void deleteVacancy(Long id) {
        candidateRepository.deleteAllByVacancy_Id(id);
        vacancyRepository.deleteById(id);
    }
}

