package com.leti.project.dto.response;

import com.leti.project.domain.VacancyStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VacancyResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Double salary;
    private VacancyStatus status;
    private LocalDate postedDate;
    private LocalDate closedDate;
    private String department;
}
