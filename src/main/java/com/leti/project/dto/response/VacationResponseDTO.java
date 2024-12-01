package com.leti.project.dto.response;

import com.leti.project.domain.VacationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VacationResponseDTO {
    private Long id;
    private Long employeeId;
    private LocalDate requestDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private VacationStatus status;
    private String rejectionReason;
}
