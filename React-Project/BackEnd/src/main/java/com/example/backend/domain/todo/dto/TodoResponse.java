package com.example.backend.domain.todo.dto;

public record TodoResponse(
        Long id,
        String content,
        boolean isCompleted
) {
}
