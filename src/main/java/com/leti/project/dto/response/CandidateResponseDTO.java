package com.leti.project.dto.response;

import com.leti.project.domain.CandidateStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CandidateResponseDTO {
    private Long id;
    private String fullName;
    private String phone;
    private String email;
    private CandidateStatus status;
    private Long vacancyId;
}
