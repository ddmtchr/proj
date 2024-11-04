package com.leti.project.service;

import com.leti.project.domain.Employee;
import com.leti.project.exception.EmployeeNotFoundException;
import com.leti.project.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public List<?> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee was not found"));
    }

    public Employee addEmployee(Employee employee) {
        employeeRepository.save(employee);
        return employee;
    }

    public void editEmployee(Long id, Employee employee) {
        if (!employeeRepository.existsById(id)) throw new EmployeeNotFoundException("Employee was not found");
        employee.setId(id);
        employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
