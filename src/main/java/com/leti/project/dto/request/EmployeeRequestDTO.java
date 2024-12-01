package com.leti.project.dto.request;

import com.leti.project.domain.EmployeeLevel;
import com.leti.project.domain.EmployeeStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeRequestDTO {
    @NotBlank
    private String fullName;
    @NotNull
    private LocalDate birthDate;
    @NotBlank
    private String phone;
    @NotBlank
    private String email;
    @NotBlank
    private String position;
    @NotNull
    private EmployeeLevel level;
    @NotNull
    private EmployeeStatus status;
    @NotNull
    private String department;
    private Integer vacationDays;
    @NotNull
    private Double salary;
    @NotNull
    private LocalDate employmentDate;
    private String dismissalReason;
    private LocalDate dismissalDate;
}
