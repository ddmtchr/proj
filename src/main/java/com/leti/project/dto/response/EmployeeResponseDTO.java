package com.leti.project.dto.response;

import com.leti.project.domain.EmployeeLevel;
import com.leti.project.domain.EmployeeStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeResponseDTO {
    private Long id;
    private String fullName;
    private LocalDate birthDate;
    private String phone;
    private String email;
    private String position;
    private EmployeeLevel level;
    private EmployeeStatus status;
    private String department;
    private Integer vacationDays;
    private Double salary;
    private LocalDate employmentDate;
    private String dismissalReason;
    private LocalDate dismissalDate;
}
