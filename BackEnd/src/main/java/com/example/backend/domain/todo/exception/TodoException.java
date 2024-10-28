package com.example.backend.domain.todo.exception;

import lombok.Getter;

@Getter
public class TodoException extends RuntimeException {

    private final TodoErrorCode errorCode;

    public TodoException(TodoErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
