package com.example.backend.domain.todo.exception;

import com.example.backend.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;

@Slf4j
@RestControllerAdvice
public class TodoExceptionHandler {

    @ExceptionHandler(TodoException.class)
    public ResponseEntity<Message<Void>> todoException(TodoException e) {
        log.error("할일 관련 오류: {}", e.getMessage());
        log.error(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(Message.fail(null, e.getErrorCode().getErrorMessage()));
    }
}
