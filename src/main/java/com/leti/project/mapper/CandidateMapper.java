package com.leti.project.mapper;

import com.leti.project.domain.Candidate;
import com.leti.project.dto.request.CandidateRequestDTO;
import com.leti.project.dto.response.CandidateResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CandidateMapper {
    CandidateMapper INSTANCE = Mappers.getMapper(CandidateMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "vacancy", ignore = true)
    Candidate toEntity(CandidateRequestDTO requestDTO);

    @Mapping(target = "vacancyId", source = "vacancy.id")
    CandidateResponseDTO toResponseDTO(Candidate e);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "vacancy", ignore = true)
    void updateCandidate(CandidateRequestDTO requestDTO, @MappingTarget Candidate e);
}
