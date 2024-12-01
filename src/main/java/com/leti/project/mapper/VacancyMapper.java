package com.leti.project.mapper;

import com.leti.project.domain.Vacancy;
import com.leti.project.dto.request.VacancyRequestDTO;
import com.leti.project.dto.response.VacancyResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface VacancyMapper {
    VacancyMapper INSTANCE = Mappers.getMapper(VacancyMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "postedDate", ignore = true)
    @Mapping(target = "closedDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    Vacancy toEntity(VacancyRequestDTO requestDTO);

    VacancyResponseDTO toResponseDTO(Vacancy e);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "postedDate", ignore = true)
    @Mapping(target = "closedDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    void updateVacancy(VacancyRequestDTO requestDTO, @MappingTarget Vacancy e);

}
