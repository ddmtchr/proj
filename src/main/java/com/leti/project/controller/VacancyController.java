package com.leti.project.controller;

import com.leti.project.service.VacancyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VacancyController {
    private final VacancyService vacancyService;
}
