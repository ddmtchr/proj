package com.leti.project.exception;

public class VacationIllegalStateException extends BadRequestException {
    public VacationIllegalStateException(String message) {
        super(message);
    }
}
