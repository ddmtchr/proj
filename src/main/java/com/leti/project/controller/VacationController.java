package com.leti.project.controller;

import com.leti.project.service.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VacationController {
    private final VacationService vacationService;
}
