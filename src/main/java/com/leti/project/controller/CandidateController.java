package com.leti.project.controller;

import com.leti.project.dto.request.CandidateRequestDTO;
import com.leti.project.dto.response.CandidateResponseDTO;
import com.leti.project.service.CandidateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidate")
@RequiredArgsConstructor
public class CandidateController {
    private final CandidateService candidateService;

    @GetMapping
    public ResponseEntity<List<CandidateResponseDTO>> getAllCandidates() {
        return ResponseEntity.ok(candidateService.getAllCandidates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidateResponseDTO> getCandidateById(@PathVariable Long id) {
        return ResponseEntity.ok(candidateService.getCandidateById(id));
    }

    @GetMapping("/vacancy")
    public ResponseEntity<List<CandidateResponseDTO>> getAllCandidatesByVacancyId(@RequestParam Long vacancyId) {
        return ResponseEntity.ok(candidateService.getAllCandidatesByVacancyId(vacancyId));
    }

    @PostMapping
    public ResponseEntity<CandidateResponseDTO> addCandidate(@RequestBody @Valid CandidateRequestDTO requestDTO, @RequestParam Long vacancyId) {
        return new ResponseEntity<>(candidateService.addCandidate(requestDTO, vacancyId), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidateResponseDTO> editCandidate(@PathVariable Long id, @RequestBody @Valid CandidateRequestDTO requestDTO) {
        return new ResponseEntity<>(candidateService.editCandidate(id, requestDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
