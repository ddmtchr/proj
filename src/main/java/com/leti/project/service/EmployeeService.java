package com.leti.project.service;

import com.leti.project.domain.Employee;
import com.leti.project.domain.EmployeeStatus;
import com.leti.project.dto.request.EmployeeRequestDTO;
import com.leti.project.dto.response.EmployeeResponseDTO;
import com.leti.project.exception.EmployeeNotFoundException;
import com.leti.project.mapper.EmployeeMapper;
import com.leti.project.repository.EmployeeRepository;
import com.leti.project.repository.VacationRepository;
import com.leti.project.security.entity.User;
import com.leti.project.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final VacationRepository vacationRepository;

    public List<EmployeeResponseDTO> getAllEmployees() {
        return employeeRepository.findAll().stream().map(EmployeeMapper.INSTANCE::toResponseDTO).toList();
    }

    public EmployeeResponseDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee was not found"));
        return EmployeeMapper.INSTANCE.toResponseDTO(employee);
    }

    public EmployeeResponseDTO getEmployeeByUserId(Long id) {
        Employee employee = employeeRepository.findByUser_Id(id).orElseThrow(() -> new EmployeeNotFoundException("Employee was not found"));
        return EmployeeMapper.INSTANCE.toResponseDTO(employee);
    }

    public EmployeeResponseDTO addEmployee(EmployeeRequestDTO requestDTO, Long userId) {
        Employee employee = EmployeeMapper.INSTANCE.toEntity(requestDTO);
        User user = userRepository.findById(userId).orElseThrow(() -> new EmployeeNotFoundException("User was not found"));
        employee.setUser(user);
        return EmployeeMapper.INSTANCE.toResponseDTO(employeeRepository.save(employee));
    }

    public EmployeeResponseDTO editEmployee(Long id, EmployeeRequestDTO requestDTO) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee was not found"));
        EmployeeMapper.INSTANCE.updateEmployee(requestDTO, employee);
        return EmployeeMapper.INSTANCE.toResponseDTO(employeeRepository.save(employee));
    }

    public EmployeeResponseDTO dismissEmployee(Long id, String reason) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee was not found"));
        employee.setDismissalDate(LocalDate.now());
        employee.setDismissalReason(reason);
        employee.setStatus(EmployeeStatus.DISMISSED);
        if (employee.getUser() != null) {
            Long userId = employee.getUser().getId();
            employee.setUser(null);
            userRepository.deleteById(userId);
        }
        employee = (employeeRepository.save(employee));
        return EmployeeMapper.INSTANCE.toResponseDTO(employee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee was not found"));
        if (employee.getUser() != null) {
            Long userId = employee.getUser().getId();
            employee.setUser(null);
            userRepository.deleteById(userId);
        }
        vacationRepository.deleteAllByEmployee_Id(id);
        employeeRepository.delete(employee);
    }
}
