package com.leti.project.controller;

import com.leti.project.dto.request.VacancyRequestDTO;
import com.leti.project.dto.response.VacancyResponseDTO;
import com.leti.project.service.VacancyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacancy")
@RequiredArgsConstructor
public class VacancyController {
    private final VacancyService vacancyService;

    @GetMapping
    public ResponseEntity<List<VacancyResponseDTO>> getAllVacancies() {
        return ResponseEntity.ok(vacancyService.getAllVacancies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VacancyResponseDTO> getVacancyById(@PathVariable Long id) {
        return ResponseEntity.ok(vacancyService.getVacancyById(id));
    }

    @PostMapping
    public ResponseEntity<VacancyResponseDTO> openVacancy(@RequestBody @Valid VacancyRequestDTO requestDTO) {
        return new ResponseEntity<>(vacancyService.openVacancy(requestDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VacancyResponseDTO> editVacancy(@PathVariable Long id, @RequestBody @Valid VacancyRequestDTO requestDTO) {
        return new ResponseEntity<>(vacancyService.editVacancy(id, requestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}/close")
    public ResponseEntity<VacancyResponseDTO> closeVacancy(@PathVariable Long id) {
        return new ResponseEntity<>(vacancyService.closeVacancy(id), HttpStatus.OK);
    }

    @PutMapping("/{id}/reopen")
    public ResponseEntity<VacancyResponseDTO> reopenVacancy(@PathVariable Long id) {
        return new ResponseEntity<>(vacancyService.reopenVacancy(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVacancy(@PathVariable Long id) {
        vacancyService.deleteVacancy(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
