package com.leti.project.mapper;

import com.leti.project.domain.Employee;
import com.leti.project.dto.request.EmployeeRequestDTO;
import com.leti.project.dto.response.EmployeeResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EmployeeMapper {
    EmployeeMapper INSTANCE = Mappers.getMapper(EmployeeMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    Employee toEntity(EmployeeRequestDTO requestDTO);

    @Mapping(target = "username", source = "user.username")
    EmployeeResponseDTO toResponseDTO(Employee e);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateEmployee(EmployeeRequestDTO requestDTO, @MappingTarget Employee e);
}
