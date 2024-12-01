package com.leti.project.mapper;

import com.leti.project.domain.Vacation;
import com.leti.project.dto.request.VacationRequestDTO;
import com.leti.project.dto.response.VacationResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface VacationMapper {
    VacationMapper INSTANCE = Mappers.getMapper(VacationMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "requestDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "rejectionReason", ignore = true)
    Vacation toEntity(VacationRequestDTO requestDTO);

    @Mapping(target = "employeeId", source = "employee.id")
    VacationResponseDTO toResponseDTO(Vacation e);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "requestDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "rejectionReason", ignore = true)
    void updateVacation(VacationRequestDTO requestDTO, @MappingTarget Vacation e);
}
