package com.leti.project.dto.request;

import com.leti.project.domain.CandidateStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CandidateRequestDTO {
    @NotBlank
    private String fullName;
    @NotBlank
    private String phone;
    private String email;
    @NotNull
    private CandidateStatus status;
}
