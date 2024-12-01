package com.leti.project.controller;

import com.leti.project.dto.request.EmployeeRequestDTO;
import com.leti.project.dto.response.EmployeeResponseDTO;
import com.leti.project.security.service.JwtService;
import com.leti.project.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @GetMapping("/me")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeByUserId() {
        return ResponseEntity.ok(employeeService.getEmployeeByUserId(jwtService.getCurrentUser().getId()));
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> addEmployee(@RequestBody @Valid EmployeeRequestDTO requestDTO, @RequestParam Long userId) {
        return new ResponseEntity<>(employeeService.addEmployee(requestDTO, userId), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> editEmployee(@PathVariable Long id, @RequestBody @Valid EmployeeRequestDTO requestDTO) {
        return new ResponseEntity<>(employeeService.editEmployee(id, requestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}/dismiss")
    public ResponseEntity<EmployeeResponseDTO> dismissEmployee(@PathVariable Long id, @RequestParam String reason) {
        return new ResponseEntity<>(employeeService.dismissEmployee(id, reason), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
