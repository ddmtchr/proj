package com.leti.project.controller;

import com.leti.project.domain.VacationStatus;
import com.leti.project.dto.request.VacationRequestDTO;
import com.leti.project.dto.response.VacationResponseDTO;
import com.leti.project.security.service.JwtService;
import com.leti.project.service.VacationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacation")
@RequiredArgsConstructor
public class VacationController {
    private final VacationService vacationService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<VacationResponseDTO>> getAllVacations() {
        return ResponseEntity.ok(vacationService.getAllVacations());
    }

    @GetMapping("/status")
    public ResponseEntity<List<VacationResponseDTO>> getAllVacationsByStatus(@RequestParam @Valid VacationStatus status) {
        return ResponseEntity.ok(vacationService.getAllVacationsByStatus(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VacationResponseDTO> getVacationById(@PathVariable Long id) {
        return ResponseEntity.ok(vacationService.getVacationById(id));
    }

    @GetMapping("/my")
    public ResponseEntity<List<VacationResponseDTO>> getUserVacations() {
        return ResponseEntity.ok(vacationService.getUserVacations(jwtService.getCurrentUser().getId()));
    }

    @PostMapping
    public ResponseEntity<VacationResponseDTO> addVacation(@RequestBody @Valid VacationRequestDTO requestDTO) {
        return new ResponseEntity<>(vacationService.addVacation(requestDTO, jwtService.getCurrentUser().getId()), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VacationResponseDTO> editVacation(@PathVariable Long id, @RequestBody @Valid VacationRequestDTO requestDTO) {
        return new ResponseEntity<>(vacationService.editVacation(id, requestDTO, jwtService.getCurrentUser().getId()), HttpStatus.OK);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<VacationResponseDTO> approveVacation(@PathVariable Long id) {
        return new ResponseEntity<>(vacationService.approveVacation(id), HttpStatus.OK);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<VacationResponseDTO> rejectVacation(@PathVariable Long id, @RequestParam String reason) {
        return new ResponseEntity<>(vacationService.rejectVacation(id, reason), HttpStatus.OK);
    }

    @PutMapping("/{id}/start")
    public ResponseEntity<VacationResponseDTO> startVacation(@PathVariable Long id) {
        return new ResponseEntity<>(vacationService.startVacation(id), HttpStatus.OK);
    }

    @PutMapping("/{id}/finish")
    public ResponseEntity<VacationResponseDTO> finishVacation(@PathVariable Long id) {
        return new ResponseEntity<>(vacationService.finishVacation(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVacation(@PathVariable Long id) {
        vacationService.deleteVacation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

