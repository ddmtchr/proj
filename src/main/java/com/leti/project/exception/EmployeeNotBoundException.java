package com.leti.project.exception;

public class EmployeeNotBoundException extends RuntimeException {
    public EmployeeNotBoundException(String message) {
        super(message);
    }
}
