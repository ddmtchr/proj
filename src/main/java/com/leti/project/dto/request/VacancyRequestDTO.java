package com.leti.project.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VacancyRequestDTO {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    private Double salary;
    @NotBlank
    private String department;
}
