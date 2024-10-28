package com.example.backend.domain.todo.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TodoErrorCode {

    NOT_FOUND_TODO(HttpStatus.NOT_FOUND, "해당 할일을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
