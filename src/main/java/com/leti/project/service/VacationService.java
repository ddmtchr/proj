package com.leti.project.service;

import com.leti.project.domain.Vacation;
import com.leti.project.domain.VacationStatus;
import com.leti.project.dto.request.VacationRequestDTO;
import com.leti.project.dto.response.VacationResponseDTO;
import com.leti.project.exception.EmployeeNotFoundException;
import com.leti.project.exception.VacationIllegalStateException;
import com.leti.project.exception.VacationNotFoundException;
import com.leti.project.mapper.VacationMapper;
import com.leti.project.repository.EmployeeRepository;
import com.leti.project.repository.VacationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class VacationService {
    private final VacationRepository vacationRepository;
    private final EmployeeRepository employeeRepository;

    public List<VacationResponseDTO> getAllVacations() {
        return vacationRepository.findAll().stream().map(VacationMapper.INSTANCE::toResponseDTO).toList();
    }

    public List<VacationResponseDTO> getAllVacationsByStatus(VacationStatus status) {
        return vacationRepository.findAllByStatus(status).stream().map(VacationMapper.INSTANCE::toResponseDTO).toList();
    }

    public VacationResponseDTO getVacationById(Long id) {
        Vacation vacation = vacationRepository.findById(id).orElseThrow(() -> new VacationNotFoundException("Vacation was not found"));
        return VacationMapper.INSTANCE.toResponseDTO(vacation);
    }

    public List<VacationResponseDTO> getUserVacations(Long userId) {
        return vacationRepository.findAllByEmployee_User_Id(userId).stream().map(VacationMapper.INSTANCE::toResponseDTO).toList();
    }

    public VacationResponseDTO addVacation(VacationRequestDTO requestDTO, Long userId) {
        Vacation vacation = VacationMapper.INSTANCE.toEntity(requestDTO);
        vacation.setEmployee(employeeRepository.findByUser_Id(userId).orElseThrow(() -> new EmployeeNotFoundException("Employee was not found")));
        vacation.setRequestDate(LocalDate.now());
        vacation.setStatus(VacationStatus.PENDING);
        return VacationMapper.INSTANCE.toResponseDTO(vacationRepository.save(vacation));
    }

    public VacationResponseDTO editVacation(Long id, VacationRequestDTO requestDTO, Long userId) {
        Vacation vacation = vacationRepository.findByIdAndEmployee_User_Id(id, userId).orElseThrow(() -> new VacationNotFoundException("Vacation was not found"));
        VacationMapper.INSTANCE.updateVacation(requestDTO, vacation);
        return VacationMapper.INSTANCE.toResponseDTO(vacationRepository.save(vacation));
    }

    public VacationResponseDTO approveVacation(Long id) {
        Vacation vacation = vacationRepository.findById(id).orElseThrow(() -> new VacationNotFoundException("Vacation was not found"));
        if (vacation.getStatus() != VacationStatus.PENDING) {
            throw new VacationIllegalStateException("Vacation is not pending for approval");
        }
        vacation.setStatus(VacationStatus.APPROVED);
        return VacationMapper.INSTANCE.toResponseDTO(vacationRepository.save(vacation));
    }

    public VacationResponseDTO rejectVacation(Long id, String reason) {
        Vacation vacation = vacationRepository.findById(id).orElseThrow(() -> new VacationNotFoundException("Vacation was not found"));
        if (vacation.getStatus() != VacationStatus.PENDING) {
            throw new VacationIllegalStateException("Vacation is not pending for approval");
        }
        vacation.setStatus(VacationStatus.REJECTED);
        vacation.setRejectionReason(reason);
        return VacationMapper.INSTANCE.toResponseDTO(vacationRepository.save(vacation));
    }

    public VacationResponseDTO startVacation(Long id) {
        Vacation vacation = vacationRepository.findById(id).orElseThrow(() -> new VacationNotFoundException("Vacation was not found"));
        if (vacation.getStatus() != VacationStatus.APPROVED) {
            throw new VacationIllegalStateException("Vacation is not approved");
        }
        vacation.setStatus(VacationStatus.VACATION);
        return VacationMapper.INSTANCE.toResponseDTO(vacationRepository.save(vacation));
    }

    public VacationResponseDTO finishVacation(Long id) {
        Vacation vacation = vacationRepository.findById(id).orElseThrow(() -> new VacationNotFoundException("Vacation was not found"));
        if (vacation.getStatus() != VacationStatus.VACATION) {
            throw new VacationIllegalStateException("Vacation is not active");
        }
        vacation.setStatus(VacationStatus.FINISHED);
        return VacationMapper.INSTANCE.toResponseDTO(vacationRepository.save(vacation));
    }

    public void deleteVacation(Long id) {
        vacationRepository.deleteById(id);
    }
}

