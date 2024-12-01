package com.leti.project.dto.request;

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
public class VacationRequestDTO {
    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
}
